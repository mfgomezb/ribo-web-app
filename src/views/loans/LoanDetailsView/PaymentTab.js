import React, { useState } from 'react';
// import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
  // TablePagination,
  TableRow,
  // Typography,
  makeStyles, Button
  // Link
} from '@material-ui/core';
// import {
//   Edit as EditIcon,
//   ArrowRight as ArrowRightIcon
// } from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import {handlePaymentRemoval} from 'src/actions/loans';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { useSelector, useDispatch } from 'react-redux';



const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const scheduleStatus = dayDiff => {
  if (dayDiff >= 0) {
    return 'PENDING'
  } else if (dayDiff < 0 && dayDiff >= -5) {
    return 'GRACE'
  } else {
    return 'OVERDUE'
  }
}
const getStatusLabel = (status) => {
  // let status = scheduleStatus(dayDiff)

  const map = {
    PAID: {
      text: 'PAGO',
      color: 'success'
    },
    PAID_LATE: {
      text: 'PAGO TARDE',
      color: 'warning'
    },
    OVERDUE: {
      text: 'VENCIDO',
      color: 'error'
    },
    PENDING: {
      text: 'PENDIENTE',
      color: 'primary'
    },
    GRACE: {
      text: 'GRACIA',
      color: 'warning'
    },
  };

  const { text, color } = map[status];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const getDaysBehind = (date, startDate = DateTime.local().toString()) => {
  let end = DateTime.fromISO(date);
  let start = DateTime.fromISO(startDate)  ;
  return Math.round(end.diff(start, 'days').days);
}

const isPaymentFulfilled = (data) => {
  let {interest, interest_pmt, principal, principal_pmt} = data
  let installment = interest + principal
  let installmentPayment = interest_pmt + principal_pmt
  return installmentPayment >= installment*0.99
}

const isPastDate = daysBehind => {
  return daysBehind <= 0;
}

const statusSetter = (data) => {
  let isDue = isPastDate(getDaysBehind(data.date))
  let isFulfilled = isPaymentFulfilled(data)
  if (isDue && isFulfilled) {
    let paymentDate = data.lastPayment || data.date_pmt
    let days = getDaysBehind(data.date, paymentDate)
    let isPaidLate = isPastDate(days+1)
    if (isPaidLate) {
      return 'PAID_LATE'
    }
    return 'PAID'
  } else if (isDue && !isFulfilled) {
    return 'OVERDUE'
  } else if (!isDue && isFulfilled){
    return 'PAID'
  } else {
    return 'PENDING'
  }
}


const useStyles = makeStyles(() => ({
  root: {}
}));

const PaymentTab = ({ className, loanId, ...rest }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const loanPayments = useSelector((state) => state.loan.loanPayments)
  const loading = useSelector((state) => state.loan.loading)

  const handleDelete = async payment => {
    try {
      await dispatch(handlePaymentRemoval(payment))
      enqueueSnackbar('Pago eliminado correctamente', {
        variant: 'success'
      });
    } catch (e) {
      enqueueSnackbar('Error al eliminar pago', {
        variant: 'error'
      });
    }
  }


  if (!loanPayments) {
    return null
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={
            <Box >
              <Button
                onClick={() => handleDelete(loanPayments[0])}
                disabled={loading}
                startIcon={<DeleteIcon />}>
                Eliminar último pago
              </Button>
              <GenericMoreButton />
            </Box>}
          title="Pagos recibidos"
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
                  <TableCell style={{whiteSpace: 'nowrap'}}>
                    Fecha de Pago
                  </TableCell>
                  <TableCell style={{whiteSpace: 'nowrap'}}>
                    Fecha Pactada
                  </TableCell>
                  <TableCell>
                    Monto
                  </TableCell>
                  <TableCell>
                    Estatus
                  </TableCell>
                  <TableCell>
                    Cuenta
                  </TableCell>
                  <TableCell>
                    Dias
                  </TableCell>
                  <TableCell style={{whiteSpace: 'nowrap'}}>
                    Tipo de Pago
                  </TableCell>
                  <TableCell>
                    Método
                  </TableCell>
                  <TableCell>
                    Referencia
                  </TableCell>
                  <TableCell>
                    Comentario
                  </TableCell>
                  <TableCell>
                    Registro
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanPayments.map((payment, index, arr) => {
                  let {
                    _id,
                    date_pmt,
                    amount,
                    cashAccount,
                    comment,
                    paymentType,
                    method,
                    reference,
                    date,
                    dayDifference,
                    status,
                    created_at,
                  } = payment
                  return (
                    <TableRow
                      key={_id}
                    >
                      <TableCell>
                          {arr.length - index}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {DateTime.fromISO(date_pmt, { setZone: true }).setLocale('ES').toFormat('ff').toString()}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {DateTime.fromISO(date).toFormat('DD').toString()}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(amount)}
                      </TableCell>
                      <TableCell>
                        {status}
                      </TableCell>
                      <TableCell>
                        {cashAccount}
                      </TableCell>
                      <TableCell>
                        {dayDifference}
                      </TableCell>
                      <TableCell>
                        {paymentType || ''}
                      </TableCell>
                      <TableCell>
                        {method || ''}
                      </TableCell>
                      <TableCell>
                        {reference || ''}
                      </TableCell>
                      <TableCell>
                        {comment || ''}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {DateTime.fromISO(created_at).toFormat('DD').toString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {/*<TablePagination*/}
        {/*  component="div"*/}
        {/*  count={isLoading ? 0: data.length}*/}
        {/*  onChangePage={handlePageChange}*/}
        {/*  onChangeRowsPerPage={handleLimitChange}*/}
        {/*  page={page}*/}
        {/*  rowsPerPage={limit}*/}
        {/*  rowsPerPageOptions={[5, 10, 25]}*/}
        {/*/>*/}
      </Card>
    </div>
  );
};

PaymentTab.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

PaymentTab.defaultProps = {
  orders: []
};

export default PaymentTab;
