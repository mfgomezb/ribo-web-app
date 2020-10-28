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
  makeStyles, Link
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useBorrowerLoans } from '../../../../hooks/useLoans';
import { paymentFrequency as paymentFrequencyConstants } from 'src/utils/constants'

const getStatusLabel = (paymentStatus) => {
  const map = {
    canceled: {
      text: 'Canceled',
      color: 'error'
    },
    CLOSED: {
      text: 'cerrado',
      color: 'success'
    },
    OPEN: {
      text: 'abierto',
      color: 'warning'
    },
    rejected: {
      text: 'Rejected',
      color: 'error'
    }
  };

  const { text, color } = map[paymentStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyPagination = (data, page, limit) => {
  return (data) ? data.slice(page * limit, page * limit + limit) : []
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const LoansInfo = ({ className, ...rest }) => {
  const {customerId} = useParams()
  const { isLoading, data, error } = useBorrowerLoans(customerId)
  const [paginatedLoans, setPaginatedLoans] = useState([])
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
    setPaginatedLoans(pagination)
  }, [data])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Préstamos"
        />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={900}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Préstamo
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      inicio
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Estatus
                  </TableCell>
                  <TableCell>
                    Capital
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      balance
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Repagado
                  </TableCell>
                  <TableCell>
                    Ingreso
                  </TableCell>
                  <TableCell>
                    Tasa (%)
                  </TableCell>
                  <TableCell>
                    Duración (m)
                  </TableCell>
                  <TableCell>
                    Cuotas
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      frecuencia
                    </Typography>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedLoans.map((loan) => {
                  return (
                    <TableRow
                      key={loan._id}
                    >
                      <TableCell>
                        <Link
                          variant="subtitle2"
                          color="textPrimary"
                          component={RouterLink}
                          underline="none"
                          to={`/app/management/loan/${loan._id}`}
                        >
                          {loan._id.slice(loan._id.length -8, loan._id.length).toUpperCase()}
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {DateTime.fromISO(loan.startDate).toFormat('DD').toString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusLabel(loan.status)}
                      </TableCell>
                      <TableCell>
                        {numeral(loan.capital).format(`${loan.currency}0,0.00`)}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {numeral(loan.capital - loan.totalRepaid).format(`${loan.currency}0,0.00`)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {numeral(loan.totalRepaid).format(`${loan.currency}0,0.00`)}
                      </TableCell>
                      <TableCell>
                        {numeral(loan.interestPaid).format(`${loan.currency}0,0.00`)}
                      </TableCell>
                      <TableCell>
                        {numeral((loan.interestRate || loan.interest)/100).format(`0,0.00%`)}
                      </TableCell>
                      <TableCell>
                        {Math.round(DateTime.fromISO(loan.finishDate).diff(DateTime.fromISO(loan.startDate), 'months').months * 100) / 100}
                      </TableCell>
                      <TableCell>
                        {loan.numberOfInstallments || loan.duration}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {paymentFrequencyConstants[loan.paymentFrequency] || paymentFrequencyConstants[loan.period] }
                        </Typography>
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
