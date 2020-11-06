import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk  from 'redux-thunk'
import logger  from 'redux-logger'
import { ENABLE_REDUX_DEV_TOOLS } from 'src/constants';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk,logger, ],
  devTools: ENABLE_REDUX_DEV_TOOLS
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
