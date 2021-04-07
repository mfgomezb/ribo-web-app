// actions
import {
  deleteInstallmentPayment,
  fetchInstallmentDetails,
  fetchLoanDetails, fetchLoanInvestorsPosition,
  fetchLoanPayments,
  fetchLoanSchedule,
  fetchLoanTransactions
} from '../utils/API';

export const RECEIVE_LOAN_DETAILS = 'RECEIVE_LOAN_DETAILS'
export const RECEIVE_LOAN_INVESTORS = 'RECEIVE_LOAN_INVESTORS'
export const RECEIVE_LOAN_TRANSACTIONS = 'RECEIVE_LOAN_TRANSACTIONS'
export const REMOVE_LOAN_TRANSACTIONS = 'REMOVE_LOAN_TRANSACTIONS'
export const REMOVE_LOAN_DETAILS = 'REMOVE_LOAN_DETAILS'
export const RECEIVE_LOAN_SCHEDULE = 'RECEIVE_LOAN_SCHEDULE'
export const REMOVE_LOAN_SCHEDULE = 'REMOVE_LOAN_SCHEDULE'
export const RECEIVE_LOAN_PAYMENT = 'RECEIVE_LOAN_PAYMENT'
export const RECEIVE_INSTALLMENT_DETAILS = 'RECEIVE_INSTALLMENT_DETAILS'
export const REMOVE_INSTALLMENT_DETAILS = 'REMOVE_INSTALLMENT_DETAILS'
export const REMOVE_INSTALLMENT_PAYMENT = 'REMOVE_INSTALLMENT_PAYMENT'
export const START_ASYNC_OPERATION = 'START_ASYNC_OPERATION'
export const FINISH_ASYNC_OPERATION = 'FINISH_ASYNC_OPERATION'

export function receiveLoanDetails (loanDetails) {
  return {
    type: RECEIVE_LOAN_DETAILS,
    loanDetails,
  }
}

export function receiveLoanSchedule (loanSchedule) {
  return {
    type: RECEIVE_LOAN_SCHEDULE,
    loanSchedule,
  }
}

export function receiveLoanInvestorsPosition (loanInvestors) {
  return {
    type: RECEIVE_LOAN_INVESTORS,
    loanInvestors,
  }
}

export function receiveLoanPayments (loanPayments) {
  return {
    type: RECEIVE_LOAN_PAYMENT,
    loanPayments,
  }
}

export function receiveLoanTransactions (loanTransactions) {
  return {
    type: RECEIVE_LOAN_TRANSACTIONS,
    loanTransactions,
  }
}

export function removeLoanTransactions () {
  return {
    type: REMOVE_LOAN_TRANSACTIONS,
  }
}

export function receiveLoanInstallment (installmentDetails) {
  return {
    type: RECEIVE_INSTALLMENT_DETAILS,
    installmentDetails,
  }
}

export function removeLoanInstallment () {
  return {
    type: REMOVE_INSTALLMENT_DETAILS
  }
}

export function removeLoanSchedule () {
  return {
    type: REMOVE_LOAN_SCHEDULE
  }
}

export function removeLoanDetails () {
  return {
    type: REMOVE_LOAN_DETAILS
  }
}

export function removeInstallmentPayment () {
  return {
    type: REMOVE_INSTALLMENT_PAYMENT,
  }
}

export function startAsyncOperation () {
  return {
    type: START_ASYNC_OPERATION,
  }
}

export function finishAsyncOperation () {
  return {
    type: FINISH_ASYNC_OPERATION,
  }
}


export function handleLoanInitialData(loanId) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return Promise.all([
      fetchLoanDetails(loanId),
      fetchLoanSchedule(loanId),
      fetchLoanPayments(loanId),
    ])
      .then( data => {
        dispatch(receiveLoanDetails(data[0]))
        dispatch(receiveLoanSchedule(data[1]))
        dispatch(receiveLoanPayments(data[2]))
      })
      .finally( () => dispatch(finishAsyncOperation()))
  }
}



export function handleInstallmentInitialData(scheduleId) {
  return (dispatch) => {

    return Promise.all([
      fetchInstallmentDetails(scheduleId),
    ])
      .then( data => {
        dispatch(receiveLoanInstallment(data[0][0]))
      })
  }
}

export function handleLoanTransactionInitialData(loanId) {
  return (dispatch) => {
    return fetchLoanTransactions(loanId)
      .then( data => {
        dispatch(receiveLoanTransactions(data))
      })
  }
}

export function handleLoanInvestorsPosition(loanId) {
  return (dispatch) => {
    return fetchLoanInvestorsPosition(loanId)
      .then( data => {
        dispatch(receiveLoanInvestorsPosition(data))
      })
  }
}



export function handlePaymentRemoval(loanId) {
  return async (dispatch) => {
    dispatch(startAsyncOperation())
    return await deleteInstallmentPayment(loanId)
      .then( (res) => {
        dispatch(removeInstallmentPayment());
      })
      .then( () => {
          return Promise.all([
            fetchLoanDetails(loanId),
            fetchLoanSchedule(loanId),
            fetchLoanPayments(loanId),
          ]);
      })
      .then( data => {
        dispatch(receiveLoanDetails(data[0]))
        dispatch(receiveLoanSchedule(data[1]))
        dispatch(receiveLoanPayments(data[2]))
        }
      )
      .finally( () => dispatch(finishAsyncOperation()))
  }
}
