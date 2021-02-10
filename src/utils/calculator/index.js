const { rounder } = require("../numbers")
const { DateTime } = require('luxon');

/**
 * Interest rate transformer
 * @param {number} interest - product interest rate
 * @param {string} paymentFrequency - product payment frequency
 */

function interestRatesTransformer(interest, paymentFrequency) {
    interest /= 100

    switch (paymentFrequency) {
        case 'annually':
            return rounder(interest *12,4)
        case 'semiAnnually':
            return rounder(interest *6,4)
        case 'quarterly':
            return rounder(interest *3,4)
        case 'monthly':
            return rounder(interest, 4)
        case 'biWeekly':
            return rounder(((interest *12) / 360) * 14,4)
        case 'biMonthly':
            return rounder(((interest *12) / 360) * 15, 5)
        case 'weekly':
            return rounder(((interest *12) / 360) * 7,4)
        case 'daily':
            return rounder(((interest *12) / 360),4)
        default:
            return rounder(interest, 4)
    }
}


/**
 * Receives the paymentFrequency and returns the unit to calculate the schedule
 * @param {string} paymentFrequency - payment frequency
 */

function timeFrameUnitPicker(paymentFrequency) {
    let unit
    if (['monthly', 'quarterly', 'semiAnnually', 'annually'].indexOf(paymentFrequency) !== -1) {
        unit = 'months'
    } else if (['biWeekly', 'weekly'].indexOf(paymentFrequency) !== -1) {
        unit = 'weeks'
    }
    return unit;
}

/**
 * Receives the paymentFrequency and returns the amount of periods to add to schedule
 * @param {string} paymentFrequency - payment frequency
 */

function amountTimeFramePicker(paymentFrequency) {
    let amount
    if (paymentFrequency === 'monthly') {
        amount = 1
    } else if (paymentFrequency === 'quarterly') {
        amount = 3
    } else if (paymentFrequency === 'semiAnnually') {
        amount = 6
    } else if (paymentFrequency === 'annually') {
        amount = 12
    } else if (paymentFrequency === 'weekly') {
        amount = 1
    } else if (paymentFrequency === 'biWeekly') {
        amount = 2
    }
    return amount;
}

/**
 * Receives a date and returns the last day of the given month
 * @param {string} date - schedule date 'YYYY-MM-DD'
 * @returns {string} date - string formatted 'YYYY-MM-DD'
 */

function lastDayOfMonth(date) {
    return DateTime.fromISO(date).endOf('month').toString().slice(0,10)
}

/**
 * Receives a date and returns the 15th of the next month
 * @param {string} date - schedule date 'YYYY-MM-DD'
 * @returns {string} date string formatted 'YYYY-MM-DD'
 */

function fifteenOfNextMonth(date) {
    return DateTime.fromISO(date).plus({months: 1}).set({day: 15}).toString().slice(0,10)
}

/**
 * Receives a date and returns the 15th of the current month
 * @param {string} date - schedule date 'YYYY-MM-DD'
 */

function fifteenOfCurrentMonth(date) {
    return DateTime.fromISO(date).set({day: 15}).toString().slice(0,10)
}

/**
 * checks if date is the las date of the month
 * @param {date} date - schedule date 'YYYY-MM-DD'
 */

function isLastDayOfMonth(date) {
    return date.toString().slice(0,10) === lastDayOfMonth(date)
}

/**
 * checks the day of the month
 * @param {date} date - schedule date
 */

function getDayOfMonth(date) {
    return DateTime.fromISO(date).day
}

/**
 * returns the next date of the pay day schedule
 * @param {date} previousDate - schedule date
 */

function scheduleBiMonthlyNextDate(previousDate) {
    if (getDayOfMonth(previousDate) === 15) {
        return lastDayOfMonth(previousDate)
    } else if (isLastDayOfMonth(previousDate)) {
        return fifteenOfNextMonth(previousDate)
    } else if (getDayOfMonth(previousDate) >= 10) {
        return lastDayOfMonth(previousDate)
    } else if (getDayOfMonth(previousDate) < 10) {
        return fifteenOfCurrentMonth(previousDate)
    }
}

/**
 * Receives the next date of the schedule
 * @param {date} date - date
 * @param {string} paymentFrequency - paymentFrequency unit
 */


function scheduleNextDate(date, paymentFrequency) {
    let unit = timeFrameUnitPicker(paymentFrequency);
    let amount = amountTimeFramePicker(paymentFrequency);

    if (isLastDayOfMonth(date) && paymentFrequency === 'monthly') {
      return lastDayOfMonth(DateTime.fromISO(date.toString().slice(0,10)).plus({[unit]: amount}).toString().slice(0,10))
    } else {
      return DateTime.fromISO(date.toString().slice(0,10)).plus({[unit]: amount}).toString().slice(0,10)
    }
}


/**
 * Receives the previous date of the schedule and the paymentFrequency
 * and returns the date of the next schedule
 * @param {date} previousDate - schedule date
 * @param {string} paymentFrequency - loan frequency
 */

function dateResolver(previousDate, paymentFrequency) {
    if (paymentFrequency === 'biMonthly') {
        return scheduleBiMonthlyNextDate(previousDate);
    } else {
        return scheduleNextDate(previousDate, paymentFrequency);
    }
}


/**
 * Receives the previous date of the schedule and the paymentFrequency
 * and returns the date of the next schedule
 * @param {object} scheduleDetails - The schedule details necessary to generate the schedule
 * @param {string} scheduleDetails.paymentFrequency - loan payment frequency
 * @param {number} scheduleDetails.numberOfInstallments - number of loan payments
 * @param {date} scheduleDetails.startDate - date the loan starts
 * @param {date} [scheduleDetails.firstPaymentDate] - date of the first expected date
 */

const scheduleBuilder = (scheduleDetails) => {

    let {
        paymentFrequency, numberOfInstallments, startDate, firstPaymentDate
    } = scheduleDetails

    let schedule = []
    let previousDate
    let date

    for (let installment = 0; installment <= numberOfInstallments; installment++){

        if (installment >= 1) {
          previousDate = schedule[installment - 1]['date']
        }

        if (installment === 0) {
            date = startDate.toString().slice(0,10)
        } else if  (installment === 1 && firstPaymentDate && paymentFrequency !== 'biMonthly') {
            date = firstPaymentDate.toString().slice(0,10)
        } else {
            date = dateResolver(previousDate, paymentFrequency)
        }
        let payment = { 'installmentNumber': installment, date }
        schedule.push(payment)
    }
    return schedule
}

const flat = (schedule, interest, capital, firstPeriodInterest, interestOnlyPeriods = 0) => {
    let interestPortion = rounder(interest * capital, 4)
    let capitalPortion = capital / ( schedule.length -1 - interestOnlyPeriods)
    let capitalLeft =  capital
    return schedule.map( (e, i) => {
        if (i === 0 ) {
            return {
                ...e,
                balance: capitalLeft
            }
        } else {
            capitalLeft -= i > interestOnlyPeriods ? capitalPortion : 0
            let capitalPayment = i > interestOnlyPeriods ? capitalPortion : 0
            if (i === 1 ) return {
                ...e,
                payment: firstPeriodInterest + capitalPayment,
                interest: firstPeriodInterest,
                principal: capitalPayment,
                balance: capitalLeft
            }
            return {
                ...e,
                payment: interestPortion + capitalPayment,
                interest: interestPortion,
                principal: capitalPayment,
                balance: capitalLeft
            }
        }
    })
}


function payment(capital, interest, numberOfInstallments) {
    return rounder(capital * (interest / (1 - (1 + interest) ** (-numberOfInstallments))),4)
}

const lineal = (schedule, interest, capital, firstPeriodInterest, interestOnlyPeriods = 0) => {
    const numberOfInstallments = schedule.length - 1 - interestOnlyPeriods
    const installmentPayment = payment(capital, interest, numberOfInstallments)
    let capitalLeft = capital

    return schedule.map( (e, i) => {

        if (i === 0 ) {
            return {
                ...e,
                balance: capitalLeft
            }
        } else {
            if (i === 1 ) {

                capitalLeft -= i > interestOnlyPeriods ? installmentPayment - firstPeriodInterest : 0
                let firstPeriodPaymentWithK = rounder(installmentPayment - (capitalLeft * interest) + firstPeriodInterest, 4)
                return {
                    ...e,
                    payment: i > interestOnlyPeriods ? firstPeriodPaymentWithK :firstPeriodInterest ,
                    interest: firstPeriodInterest,
                    principal: i > interestOnlyPeriods ? installmentPayment - firstPeriodInterest : 0,
                    balance: capitalLeft
                }
            } else if (i === schedule.length-1) {
                let installmentInterest = capitalLeft * interest
                let capitalPayment = capitalLeft
                capitalLeft -= capitalLeft
                return {
                    ...e,
                    payment: installmentPayment,
                    interest: rounder(installmentInterest,4),
                    principal: rounder(capitalPayment,4),
                    balance: rounder(0,4)
                }
            }
            let installmentInterest = capitalLeft * interest
            capitalLeft -= i > interestOnlyPeriods ? installmentPayment - installmentInterest : 0
            return {
                ...e,
                payment: i > interestOnlyPeriods ? installmentPayment : installmentInterest,
                interest: rounder(installmentInterest,4),
                principal: i > interestOnlyPeriods ? rounder(installmentPayment - installmentInterest,4) : 0,
                balance: rounder(capitalLeft,4)
            }
        }
    })
}
const bullet = (schedule, interest, capital, firstPeriodInterest) => {}
const balloon = (schedule, interest, capital) => {}


/**
 * Receives the details necessary to calculate the first installment interest payment
 * @param {object} firstInterestPaymentDetails - The schedule details necessary to generate the schedule
 * @param {string} firstInterestPaymentDetails.startDate - interest base date for calculation
 * @param {string} firstInterestPaymentDetails.firstPaymentDate - interest target date
 * @param {string} firstInterestPaymentDetails.paymentFrequency - paymentFrequency to calculate if interest rate adjustment is needed
 * @param {number} firstInterestPaymentDetails.interestRate - interest rate
 * @param {number} firstInterestPaymentDetails.capital - capital to calculate interest value
 */

function firstInstallmentInterest(firstInterestPaymentDetails) {
    let  {startDate, firstPaymentDate, paymentFrequency, interestRate, capital} = firstInterestPaymentDetails
    const interestRatePeriodic =  interestRatesTransformer(interestRate, paymentFrequency)

    if (firstPaymentDate !== '') {
        const dayDifference = dayDiffBetweenScheduledAndFirstPaymentDate(startDate, firstPaymentDate, paymentFrequency)
        const InterestDaily = rounder(((interestRate/100) * capital) / 30,4)
        return InterestDaily * dayDifference.numberOfDays
    } else {
        return interestRatePeriodic * capital
    }
}

const loanFactory = (schedule, loanDetails) => {
    let {interestRate, capital, paymentFrequency, interestOnlyPeriods, method} = loanDetails

    const interestRatePeriodic =  interestRatesTransformer(interestRate, paymentFrequency)
    const firstPeriodInterestValue = firstInstallmentInterest(loanDetails)


    switch (method) {
        case 'flat':
            return flat(schedule, interestRatePeriodic, capital, firstPeriodInterestValue, interestOnlyPeriods)
        case 'lineal':
            return lineal(schedule, interestRatePeriodic, capital, firstPeriodInterestValue, interestOnlyPeriods)
        case 'bullet':
            return bullet(schedule, interestRatePeriodic, capital, firstPeriodInterestValue, interestOnlyPeriods)
        case 'balloon':
            return balloon(schedule, interestRatePeriodic, capital, firstPeriodInterestValue, interestOnlyPeriods)
    }
}

function validation(req) {

    if (req.capital === undefined ||
        req.firstPaymentDate === undefined ||
        req.interestOnlyPeriods === undefined ||
        req.interestRate === undefined ||
        req.method === undefined ||
        req.numberOfInstallments === undefined ||
        req.paymentFrequency === undefined ||
        req.startDate === undefined
    ){
        throw new Error('missing vars')
    }
}

function dayDiffBetweenScheduledAndFirstPaymentDate(startDate, firstPaymentDate, paymentFrequency) {
    let scheduledNextDate = paymentFrequency === 'biMonthly' ? scheduleBiMonthlyNextDate(startDate) : scheduleNextDate(startDate, paymentFrequency)
    let dayDiffExpected = DateTime.fromISO(scheduledNextDate).diff(DateTime.fromISO(startDate), 'days')
    let dayDiffFirstPayment = DateTime.fromISO(firstPaymentDate).diff(DateTime.fromISO(startDate), 'days')

    return {
        isDifferent: dayDiffFirstPayment.days !== dayDiffExpected.days,
        numberOfDays: dayDiffFirstPayment.days
    }
}

function scheduleInitialStatusSetter(schedule) {
    return schedule.map( (e, i) => {
        let status
        if (i === 0 ) {
            status = 'DISBURSTMENT'
        } else if (DateTime.fromISO(e.date).diff(DateTime.local(), 'days').days < 0) {
            status = 'DUE'
        } else {
            status = 'PENDING'
        }
        return {...e, status}
    })
}

function scheduleCurrencySetter(schedule, currency) {
    return schedule.map( (e) => {
        return {
            ...e,
            currency: currency
        }
    })
}


/**
 * Receives the details necessary to calculate a loan schedule
 * @param {{interestRate: *, capital: *, method: *, numberOfInstallments: *, interestOnlyPeriods: *, firstPaymentDate: *, paymentFrequency: *, startDate: *}} loanDetails - Loan details necessary to generate the schedule
 * @param {number} loanDetails.numberOfInstallments - number of payments to do
 * @param {number} loanDetails.interestRate - monthly interest rate
 * @param {number} loanDetails.interestOnlyPeriods - number of payments at the start that are only interest
 * @param {number} loanDetails.capital - capital to calculate interest value
 * @param {string} loanDetails.method - loan repayment method
 * @param {string} loanDetails.paymentFrequency - paymentFrequency to calculate if interest rate adjustment is needed
 * @param {string} loanDetails.currency - currency associated with the schedule
 * @param {string} loanDetails.startDate - interest base date for calculation
 * @param {string} loanDetails.firstPaymentDate - interest target date
 * @returns loan schedule
 */


export const loanScheduleCalculator = async (loanDetails) => {
    try {
        validation(loanDetails)
        const schedule = await scheduleBuilder(loanDetails)
        const statusSchedule = await scheduleInitialStatusSetter(schedule)
        const currencyAndStatusSchedule = await scheduleCurrencySetter(statusSchedule, loanDetails.currency)
        return await loanFactory(currencyAndStatusSchedule, loanDetails)
    } catch (e) {
        return []
    }
}


// let loanDetails = {
//     numberOfInstallments: 10,
//     interestRate: 2,
//     interestOnlyPeriods: 5,
//     capital: 10000,
//     method: "lineal",
//     paymentFrequency: "monthly",
//     currency: 'USD',
//     startDate: DateTime.fromISO("2020-10-01"),
//     firstPaymentDate: DateTime.fromISO("2020-11-01"),
// }
// loanScheduleCalculator(loanDetails).then(console.log)
