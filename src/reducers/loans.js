import {
  FINISH_ASYNC_OPERATION,
  RECEIVE_INSTALLMENT_DETAILS,
  RECEIVE_LOAN_DETAILS,
  RECEIVE_LOAN_INVESTORS,
  RECEIVE_LOAN_PAYMENT,
  RECEIVE_LOAN_SCHEDULE,
  RECEIVE_LOAN_TRANSACTIONS,
  REMOVE_INSTALLMENT_DETAILS,
  REMOVE_INSTALLMENT_PAYMENT,
  REMOVE_LOAN_DETAILS,
  REMOVE_LOAN_SCHEDULE,
  START_ASYNC_OPERATION
} from 'src/actions/loans';


export default function loans(state={}, action) {
  switch (action.type) {
    case RECEIVE_LOAN_DETAILS:
      const {loanDetails} = action

      return {
        ...state,
        loanDetails
    }
    case RECEIVE_LOAN_SCHEDULE:
      const {loanSchedule} = action

      return {
        ...state,
        loanSchedule,
      }
    case RECEIVE_LOAN_PAYMENT:
      const {loanPayments} = action

      return {
        ...state,
        loanPayments,
      }
    case RECEIVE_LOAN_INVESTORS:
      const {loanInvestors} = action

      return {
        ...state,
        loanInvestors

      }
    case RECEIVE_INSTALLMENT_DETAILS:
      const {installmentDetails} = action

      return {
        ...state,
        'installmentDetails': {
          ...installmentDetails
        }
      }
    case RECEIVE_LOAN_TRANSACTIONS:
      const {loanTransactions} = action

      return {
        ...state,
        loanTransactions
      }
    case REMOVE_LOAN_SCHEDULE:
      let {'loanSchedule': scheduleDetails, ...detailsWithoutSchedule} = state

      return {
        ...detailsWithoutSchedule,
      }
    case REMOVE_INSTALLMENT_DETAILS:
      let {'installmentDetails': iDetails, ...rest} = state

      return {
        ...rest,
        }
    case REMOVE_LOAN_DETAILS:
      let {'loanDetails': lDetails, ...detailsWithoutLoanDetails} = state

      return {
        ...detailsWithoutLoanDetails,
      }
    case REMOVE_INSTALLMENT_PAYMENT:
      return {
        ...state,
        'loanPayments': [...state.loanPayments.filter( (payment, i) => i !== 0)]
      }
    case START_ASYNC_OPERATION:
      return {
        ...state,
        loading: true
      }
    case FINISH_ASYNC_OPERATION:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
