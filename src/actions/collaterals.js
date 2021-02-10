
// actions
import {
  fetchLoanCollaterals,
  postLoanCollateral,
  removeLoanCollateral,
} from '../utils/API';

export const RECEIVE_COLLATERALS = 'RECEIVE_COLLATERALS'
export const REMOVE_COLLATERAL = 'REMOVE_COLLATERAL'
export const ADD_COLLATERAL = 'ADD_COLLATERAL'
export const START_ASYNC_OPERATION = 'START_ASYNC_OPERATION'
export const FINISH_ASYNC_OPERATION = 'FINISH_ASYNC_OPERATION'

export function receiveLoanCollaterals (collaterals) {
  return {
    type: RECEIVE_COLLATERALS,
    collaterals,
  }
}

export function removeCollateral (removedCollateral) {
  return {
    type: REMOVE_COLLATERAL,
    removedCollateral,
  }
}

export function addCollateral (newCollateral) {
  return {
    type: ADD_COLLATERAL,
    newCollateral,
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


export function handleLoanCollateralsInitialData(loanId) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return fetchLoanCollaterals(loanId)
      .then( data => dispatch(receiveLoanCollaterals(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}

export function handleAddNewCollateral(data) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return postLoanCollateral(data)
      // .then(() => dispatch(addCollateral(data)))
      .then(() => fetchLoanCollaterals(data._loan))
      .then( data => dispatch(receiveLoanCollaterals(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}

export function handleRemoveCollateral(commissionId, loanId) {
  return (dispatch) => {
    dispatch(startAsyncOperation())
    return removeLoanCollateral(commissionId, loanId)
      .then(() => dispatch(removeCollateral(commissionId)))
      .then(() => fetchLoanCollaterals(loanId))
      .then( data => dispatch(receiveLoanCollaterals(data)))
      .finally( () => dispatch(finishAsyncOperation()))
  }
}


