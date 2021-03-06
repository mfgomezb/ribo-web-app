import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as chatReducer } from 'src/slices/chat';
import { reducer as formReducer } from 'redux-form';
import { reducer as kanbanReducer } from 'src/slices/kanban';
import { reducer as mailReducer } from 'src/slices/mail';
import { reducer as notificationReducer } from 'src/slices/notification';
import loans  from 'src/reducers/loans'
import commissions  from 'src/reducers/commissions'
import collaterals  from 'src/reducers/collaterals'

const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  form: formReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  loan: loans,
  commission: commissions,
  collateral: collaterals,
  notifications: notificationReducer
});

export default rootReducer;
