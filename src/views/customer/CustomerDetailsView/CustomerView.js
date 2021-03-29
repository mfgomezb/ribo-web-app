import * as React from 'react';
import Details from './Details';
import Loans from './Loans';
import Investments from './Investments';

function CustomerView ({
                         customer,
                          customerView,
                       }) {

  switch (customerView) {
    case 'details':
      return <Details customer={customer} />
    case 'loans':
      return <Loans customer={customer} />
    case 'investments':
      return <Investments customer={customer} />
    default:
      return null
  }
}

export default CustomerView
