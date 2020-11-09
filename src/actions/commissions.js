
// actions
import {
  deleteInstallmentPayment,
  fetchInstallmentDetails,
  fetchLoanDetails, fetchLoanInvestorsPosition,
  fetchLoanPayments,
  fetchLoanSchedule,
  fetchLoanTransactions
} from '../utils/API';

export const RECEIVE_COMMISSIONS = 'RECEIVE_COMMISSIONS'
export const REMOVE_COMMISSION = 'REMOVE_COMMISSION'
export const ADD_COMMISSION = 'ADD_COMMISSION'
export const START_ASYNC_OPERATION = 'START_ASYNC_OPERATION'
export const FINISH_ASYNC_OPERATION = 'FINISH_ASYNC_OPERATION'

export function receiveLoanCommissions (commissions) {
  return {
    type: RECEIVE_COMMISSIONS,
    commissions,
  }
}

export function removeCommission (removedCommission) {
  return {
    type: REMOVE_COMMISSION,
    removedCommission,
  }
}

export function addCommission (newCommission) {
  return {
    type: ADD_COMMISSION,
    newCommission,
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


export function handleLoanCommissionsInitialData(loanId) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return fetchLoanCommissions(loanId)
      .then( data => dispatch(receiveLoanCommissions(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}

export function handleAddNewCommission(loanId, data) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return addLoanCommission(loanId, data)
      .then(() => dispatch(addCommission(data)))
      .then(() => fetchLoanCommissions(loanId))
      .then( data => dispatch(receiveLoanCommissions(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}

export function handleRemoveCommission(commissionId, loanId) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return removeLoanCommission(commissionId)
      .then(() => dispatch(removeCommission(commissionId)))
      .then(() => fetchLoanCommissions(loanId))
      .then( data => dispatch(receiveLoanCommissions(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}


