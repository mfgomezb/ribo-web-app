import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import ScheduleInfo from './ScheduleInfo';
import PaymentTab from './PaymentTab';
import Config from './Config';
import TransactionTab from './TransactionTab';
import InvestmentTab from './InvestmentTab';

// import Loans from './Loans';

function CustomerView ({
                         loanId,
                          loanView,
                         className,
                         ...rest
                       }) {

  switch (loanView) {
    case 'details':
      return <ScheduleInfo loanId={loanId} />
    case 'transactions':
      return <TransactionTab loanId={loanId} />
    case 'payments':
      return <PaymentTab loanId={loanId} />
    case 'investors':
      return <InvestmentTab loanId={loanId} />
    case 'config':
      return <Config loanId={loanId} />
    default:
      return null
  }
}

export default CustomerView
