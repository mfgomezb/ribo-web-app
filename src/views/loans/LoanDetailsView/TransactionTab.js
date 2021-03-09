import React, {  } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useSelector, useDispatch } from 'react-redux';
import { handleLoanTransactionInitialData } from 'src/actions/loans';

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const TransactionTab = ({ className, ...rest }) => {
  const {loanId} = useParams()
  const dispatch = useDispatch()
  const loanTransactions = useSelector((state) => state.loan.loanTransactions)
  const classes = useStyles()

  React.useEffect(() => {
    dispatch(handleLoanTransactionInitialData(loanId))
  }, [dispatch])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Transacciones"
        />
        <Divider />
        <PerfectScrollbar>
          <Box >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    #
                  </TableCell>
                  <TableCell>
                    Fecha
                  </TableCell>
                  <TableCell>
                    Cuenta
                  </TableCell>
                  <TableCell>
                    Concepto
                  </TableCell>
                  <TableCell>
                    Monto
                  </TableCell>
                  <TableCell>
                    Cuenta Efectivo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanTransactions && loanTransactions.map((schedule, index, arr) => {
                  let {date, concept, debit, credit, _investor, comment, cashAccount} = schedule
                  return (
                    <TableRow
                      key={schedule._id}
                    >
                      <TableCell>
                          {arr.length - index}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(date).toFormat('DD').toString()}
                      </TableCell>
                      <TableCell>
                        {_investor && _investor.firstName.split(" ")[0]+" "+_investor.lastName.split(" ")[0]}
                      </TableCell>
                      <TableCell>
                        {concept}
                      </TableCell>
                      <TableCell>
                        {currencyFormat((debit-credit),'$')}
                      </TableCell>
                      <TableCell>
                        {cashAccount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </div>
  );
};

TransactionTab.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

TransactionTab.defaultProps = {
  orders: []
};

export default TransactionTab;
