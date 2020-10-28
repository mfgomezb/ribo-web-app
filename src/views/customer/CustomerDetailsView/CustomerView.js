import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import Details from './Details';
import Loans from './Loans';
import Investments from './Investments';

function CustomerView ({
                         customer,
                          customerView,
                         className,
                         ...rest
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
