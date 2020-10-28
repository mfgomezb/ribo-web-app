import React, { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Link
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useLoanScheduleLoanView } from 'src/hooks/useLoans';



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

const applyPagination = (data, page, limit) => {
  return (data) ? data.slice(page * limit, page * limit + limit) : []
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const PaymentTab = ({ className, loanId, ...rest }) => {
  const { isLoading, data, error } = useLoanScheduleLoanView(loanId)
  const classes = useStyles()
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);



  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  if (isLoading) {
    return null
  }
  //
  // React.useEffect( () => {
  //   let pagination = applyPagination(data, page, limit)
  //   setPaginatedSchedule(pagination)
  // }, [data])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
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
                    {/*<Typography*/}
                    {/*  variant="body2"*/}
                    {/*  color="textSecondary"*/}
                    {/*>*/}

                    {/*</Typography>*/}
                  </TableCell>
                  <TableCell>
                    Fecha
                  </TableCell>
                  <TableCell>
                    Monto
                  </TableCell>
                  <TableCell>
                    Cuenta
                    {/*Estatus*/}
                    {/*<Typography*/}
                    {/*  variant="body2"*/}
                    {/*  color="textSecondary"*/}
                    {/*>*/}
                    {/*  días*/}
                    {/*</Typography>*/}
                  </TableCell>
                  <TableCell>
                    Tipo de Pago
                    {/*<Typography*/}
                    {/*  variant="body2"*/}
                    {/*  color="textSecondary"*/}
                    {/*>*/}
                    {/*  balance*/}
                    {/*</Typography>*/}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((schedule, index) => {
                  let {principal, principal_pmt, interest, interest_pmt, currency, date, _loan, payment} = schedule
                  // let daysBehind = getDaysBehind(date)
                  // let payment = principal + interest
                  // let paymentBalance = principal - principal_pmt + interest - interest_pmt
                  // let principalBalance = principal - principal_pmt
                  // let interestBalance = interest - interest_pmt
                  return (
                    <TableRow
                      key={schedule._id}
                    >
                      <TableCell>
                          {index}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(date).toFormat('DD').toString()}
                      </TableCell>
                      <TableCell>
                        {index !== 0 && getStatusLabel(statusSetter(schedule))}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(principal,currency)}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {/*{daysBehind < 0 && daysBehind+1}*/}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {currencyFormat(interest,currency)}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {/*{currencyFormat(paymentBalance, currency)}*/}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {currencyFormat(payment,currency)}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(principal_pmt, currency)}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(interest_pmt, currency)}
                        {/*{daysBehind < -5 ? (-(0.05/30)*daysBehind*973) : 0}*/}
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
