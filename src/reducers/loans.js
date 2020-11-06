//actions
// import { savePoll } from '../utils/api'
// import { showLoading, hideLoading } from 'react-redux-loading'
import {
  fetchLoanDetails,
  fetchLoanSchedule,
  fetchLoanPayments,
  fetchLoanTransactions,
  fetchInstallmentDetails,
  deleteInstallmentPayment, fetchLoanInvestorsPosition
} from 'src/utils/API';


// actions
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

export function removeInstallmentPayment (installment) {
  return {
    type: REMOVE_INSTALLMENT_PAYMENT,
    installment
  }
}



export function handleLoanInitialData(loanId) {
  return (dispatch) => {

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


export function handlePaymentRemoval(payment) {
  return (dispatch) => {
    return deleteInstallmentPayment(payment)
      .then( () => {
          dispatch(removeInstallmentPayment(payment));
        }
      ).then( () => {
        return Promise.all([
          fetchLoanDetails(payment._loan),
          fetchLoanSchedule(payment._loan),
          fetchLoanPayments(payment._loan),
        ]);
      })
      .then( data => {
        dispatch(receiveLoanDetails(data[0]))
        dispatch(receiveLoanSchedule(data[1]))
        dispatch(receiveLoanPayments(data[2]))
      })
  }
}

//reducers


export default function loans(state={}, action) {
  switch (action.type) {
    case RECEIVE_LOAN_DETAILS:
      const {loanDetails} = action

      return {
        ...state,
        ['loanDetails']: {
          ...loanDetails
        }
    }
    case RECEIVE_LOAN_SCHEDULE:
      const {loanSchedule} = action

      return {
        ...state,
        ['loanSchedule']: loanSchedule
      }
    case RECEIVE_LOAN_PAYMENT:
      const {loanPayments} = action

      return {
        ...state,
        ['loanPayments']: loanPayments

      }
    case RECEIVE_LOAN_INVESTORS:
      const {loanInvestors} = action

      return {
        ...state,
        ['loanInvestors']: loanInvestors

      }
    case RECEIVE_INSTALLMENT_DETAILS:
      const {installmentDetails} = action

      return {
        ...state,
        ['installmentDetails']: {
          ...installmentDetails
        }
      }
    case RECEIVE_LOAN_TRANSACTIONS:
      const {loanTransactions} = action

      return {
        ...state,
        ['loanTransactions']: loanTransactions
      }
    case REMOVE_LOAN_SCHEDULE:
      let {['loanSchedule']: scheduleDetails, ...detailsWithoutSchedule} = state

      return {
        ...detailsWithoutSchedule,
      }
    case REMOVE_INSTALLMENT_DETAILS:
      let {['installmentDetails']: iDetails, ...rest} = state

      return {
        ...rest,
        }
    case REMOVE_LOAN_DETAILS:
      let {['loanDetails']: lDetails, ...detailsWithoutLoanDetails} = state

      return {
        ...detailsWithoutLoanDetails,
      }
    case REMOVE_INSTALLMENT_PAYMENT:
      const { installment } = action
      return {
        ...state,
        loanPayments: state.loanPayments.filter( payment => payment._id !== installment._id)
      }
    default:
      return state
  }
}

// function addPoll (poll) {
//   return {
//     type: ADD_POLL,
//     poll,
//   }
// }
//
//
// export function handeAddPoll (poll) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()
//
//     dispatch(showLoading())
//
//     return savePoll({
//       ...poll,
//       author: authedUser,
//     })
//       .then((poll) => dispatch(addPoll(poll)))
//       .then(() => dispatch(hideLoading()))
//   }
// }
