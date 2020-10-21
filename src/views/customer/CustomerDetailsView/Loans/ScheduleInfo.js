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
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useBorrowerUnpaidSchedule } from '../../../../hooks/useLoans';



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

const LoansInfo = ({ className, ...rest }) => {
  const {customerId} = useParams()
  const { isLoading, data, error } = useBorrowerUnpaidSchedule(customerId)
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
          title="Cuotas vencidas o por pagar en los próximos 30 días"
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
                      días
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
                    Ínteres
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
                          {_loan.slice(_loan.length -8, _loan.length).toUpperCase()}
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

LoansInfo.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

LoansInfo.defaultProps = {
  orders: []
};

export default LoansInfo;
