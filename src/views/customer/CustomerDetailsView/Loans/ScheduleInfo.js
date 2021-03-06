import React, { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useBorrowerUnpaidSchedule } from '../../../../hooks/useLoans';
import { currencyFormat } from '../../../../utils/numbers';

const scheduleStatus = dayDiff => {
  if (dayDiff >= 0) {
    return 'PENDING'
  } else if (dayDiff < 0 && dayDiff >= -5) {
    return 'GRACE'
  } else {
    return 'OVERDUE'
  }
}
const getStatusLabel = (dayDiff) => {
  let status = scheduleStatus(dayDiff)

  const map = {
    OVERDUE: {
      text: 'VENCIDO',
      color: 'error'
    },
    PENDING: {
      text: 'PENDIENTE',
      color: 'success'
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

const getDaysBehind = (date) => {
  let end = DateTime.fromISO(date);
  let start = DateTime.local();
  return Math.round(end.diff(start, 'days').days);
}


const applyPagination = (data, page, limit) => {
  return (data) ? data.slice(page * limit, page * limit + limit) : []
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const ScheduleInfo = ({ className, ...rest }) => {
  const {customerId} = useParams()
  const { isLoading, data } = useBorrowerUnpaidSchedule(customerId)
  const [paginatedSchedule, setPaginatedSchedule] = useState([])
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);



  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };


  React.useEffect( () => {
    let pagination = applyPagination(data, page, limit)
    setPaginatedSchedule(pagination)
  }, [data])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Cuotas vencidas o por pagar en los pr??ximos 30 d??as"
        />
        <Divider />
        <PerfectScrollbar>
          <Box >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Prestamo
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >

                    </Typography>
                  </TableCell>
                  <TableCell>
                    Fecha
                  </TableCell>
                  <TableCell>
                    Estatus
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      d??as
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Cuota
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      balance
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Capital
                  </TableCell>
                  <TableCell>
                    ??nteres
                  </TableCell>
                  <TableCell>
                    Mora
                  </TableCell>
                  <TableCell>
                    Divisa
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchedule.map((schedule) => {
                  let {principal, principal_pmt, interest, interest_pmt, currency, date, _loan} = schedule
                  let daysBehind = getDaysBehind(date)
                  let payment = principal + interest
                  let paymentBalance = principal - principal_pmt + interest - interest_pmt
                  let principalBalance = principal - principal_pmt
                  let interestBalance = interest - interest_pmt
                  return (
                    <TableRow
                      key={schedule._id}
                    >
                      <TableCell>
                        <Link
                          variant="subtitle2"
                          color="textPrimary"
                          component={RouterLink}
                          underline="none"
                          to={`/app/management/loan/${_loan}`}
                        >
                          {_loan.slice(_loan.length -8, _loan.length).toUpperCase()}
                        </Link>
                      </TableCell>
                      <TableCell>
                          {DateTime.fromISO(date).toFormat('DD').toString()}
                      </TableCell>
                      <TableCell>
                        {getStatusLabel(daysBehind)}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {daysBehind < 0 && daysBehind+1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {currencyFormat(payment, currency)}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {currencyFormat(paymentBalance, currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {currencyFormat(principalBalance, currency)}
                      </TableCell>
                      <TableCell>
                        {currencyFormat(interestBalance, currency)}
                      </TableCell>
                      <TableCell>
                        {daysBehind < -5 ? (-(0.05/30)*daysBehind*973) : 0}
                      </TableCell>
                      <TableCell>
                        {currency}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={isLoading ? 0: data.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
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
