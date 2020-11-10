
import  {
  RECEIVE_COLLATERALS,
  REMOVE_COLLATERAL,
  ADD_COLLATERAL,
  START_ASYNC_OPERATION,
  FINISH_ASYNC_OPERATION,
} from 'src/actions/collaterals'

let initialState = {
  loading: false,
  collaterals: []
}

export default function collaterals(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_COLLATERALS:
      const {collaterals} = action
      return {
        ...state,
        ['collaterals']: collaterals
      }
    case REMOVE_COLLATERAL:
      const { removedCollateral } = action
      return {
        ...state,
        ['collaterals']: state.collaterals.filter(com => com._id !== removedCollateral._id)
      }
    case ADD_COLLATERAL:
      const { newCollateral } = action
      return{
        ...state,
        ['collaterals']: state.collaterals.concat(newCollateral)
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
