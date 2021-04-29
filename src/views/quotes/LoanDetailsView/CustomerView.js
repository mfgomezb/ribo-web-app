import * as React from 'react';
import ScheduleInfo from './ScheduleInfo';
import PaymentTab from './PaymentTab';
import Config from './Config';
import TransactionTab from './TransactionTab';
import InvestmentTab from './InvestmentTab';


function CustomerView ({
                          loanId,
                          loanView
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
