
import  {
  RECEIVE_COMMISSIONS,
  REMOVE_COMMISSION,
  ADD_COMMISSION,
  START_ASYNC_OPERATION,
  FINISH_ASYNC_OPERATION,
} from 'src/actions/commissions'


export default function commissions(state=[], action) {
  switch (action.type) {
    case RECEIVE_COMMISSIONS:
      const {commissions} = action
      return commissions
    case REMOVE_COMMISSION:
      const { removedCommission } = action
      return state.filter( com => com._id !== removedCommission._id)
    case ADD_COMMISSION:
      const { newCommission } = action
      return state.concat(newCommission)
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
