import  {
  RECEIVE_COMMISSIONS,
  REMOVE_COMMISSION,
  ADD_COMMISSION,
  START_ASYNC_OPERATION,
  FINISH_ASYNC_OPERATION,
} from 'src/actions/commissions'

let initialState = {
  loading: false,
  commissions: []
}

export default function commissions(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_COMMISSIONS:
      const {commissions} = action
      return {
        ...state,
        'commissions': commissions
      }
    case REMOVE_COMMISSION:
      const { removedCommission } = action
      return {
        ...state,
        'commissions': state.commissions.filter(com => com._id !== removedCommission._id)
      }
    case ADD_COMMISSION:
      const { newCommission } = action
      return{
        ...state,
        'commissions': state.commissions.concat(newCommission)
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
