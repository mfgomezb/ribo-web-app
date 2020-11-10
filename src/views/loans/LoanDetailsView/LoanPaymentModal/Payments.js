import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  TableBody,
  makeStyles, Table, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { DateTime } from 'luxon';
import numeral from 'numeral';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  listIcon: {
    marginRight: theme.spacing(3)
  }
}));

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const PaymentsList = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const installmentPayments = useSelector((state) => state.loan.installmentDetails.payments)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Box p={1}>
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
                Monto
              </TableCell>
              <TableCell align="right">
                Cuenta
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {installmentPayments && installmentPayments.map( (payment, index) => {
                return (
                  <TableRow key={payment._id}>
                    <TableCell>
                      {index+1}
                    </TableCell>
                    <TableCell>
                      {DateTime.fromISO(payment.date_pmt).toFormat('DD').toString()}
                    </TableCell>
                    <TableCell>
                      {currencyFormat(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell align="right">
                      {payment.cashAccount}
                    </TableCell>
                  </TableRow>
                  )
                })
              }
            </TableBody>
        </Table>
        </Box>
    </div>
  );
};

PaymentsList.propTypes = {
  className: PropTypes.string,
  // card: PropTypes.object.isRequired,
  installmentPayments: PropTypes.array.isRequired
};

export default PaymentsList;