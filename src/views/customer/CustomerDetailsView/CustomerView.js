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
      return <Loans customer={customer} />
    default:
      return null
  }
}

export default CustomerView
