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
  Link,
  Button
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import { useSelector, useDispatch } from 'react-redux'
import {removeLoanInstallment} from 'src/actions/loans';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import LoanEditModal from 'src/views/loans/LoanDetailsView/LoanPaymentModal';


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

const ScheduleInfo = ({ className, loanId, ...rest }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loanSchedule = useSelector((state) => state.loan.loanSchedule)
  const [isOpened, setOpened] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const handleOpen = (e) => {
    setSelectedSchedule(e)
  }

  const handleClose = () => {
    setSelectedSchedule(null)
    dispatch(removeLoanInstallment())
  };

  React.useEffect(() => {
    if (selectedSchedule) {
      setOpened(true)
    }
  }, [selectedSchedule])


  if (!loanSchedule) {
    return null
  }


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Cronograma de pagos"
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
                    Detalles
                  </TableCell>
                  <TableCell>
                    Estatus
                  </TableCell>
                  <TableCell>
                    Capital
                  </TableCell>
                  <TableCell>
                    Interés
                  </TableCell>
                  <TableCell>
                    Cuota
                  </TableCell>
                  <TableCell>
                    Pago Capital
                  </TableCell>
                  <TableCell>
                    Pago Interest
                  </TableCell>
                  <TableCell>
                    Pago Cuota
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanSchedule.map((schedule, index) => {
                  let {principal, principal_pmt, interest, interest_pmt, currency, date,  payment, _id} = schedule
                  let status = statusSetter(schedule)
                  return (
                    <TableRow
                      key={_id}
                    >
                      <TableCell>
                        {index}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(date).toFormat('DD').toString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleOpen(_id)}
                        >
                          Ver
                        </Button>
                      </TableCell>
                      <TableCell>
                        {index !== 0 && getStatusLabel(status)}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(principal,currency)}
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
                      <TableCell>
                        {currencyFormat((interest_pmt+principal_pmt), currency)}
                        {/*{currency}*/}
                      </TableCell>
                    </TableRow>

                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
      {selectedSchedule && isOpened && <LoanEditModal
        open={isOpened}
        onClose={handleClose}
        scheduleData={selectedSchedule}
      />}
    </div>
  );
};

ScheduleInfo.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

ScheduleInfo.defaultProps = {
  orders: []
};

export default ScheduleInfo;
