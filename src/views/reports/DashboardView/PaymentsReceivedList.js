import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useGetPayments } from '../../../hooks/useDashboard';

const useStyles = makeStyles((theme) => ({
  root: {},
  technology: {
    height: 30,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  cellWidthMd: {
    width: 150
  },
  cellWidthSm: {
    width: 50
  }
}));

const PaymentsReceivedList = ({ className, country, timeRange, ...rest }) => {
  const classes = useStyles();
  const payments = useGetPayments(country, timeRange)

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title={`Últimos pagos recibidos - # de pagos: ${!payments.isLoading && payments.data.collectionsDetail.length}`}
      />
      <Divider />
      <PerfectScrollbar>
        <Box height={375} minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                  Nombre
                </TableCell>
                <TableCell >
                  Cuenta
                </TableCell>
                <TableCell >
                  Categoría
                </TableCell>
                <TableCell >
                  Monto
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection="desc"
                >
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Fecha
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!payments.isLoading && payments.data.collectionsDetail.map((payment) => (
                <TableRow
                  hover
                  key={payment._id}
                >
                  <TableCell >
                    {payment.fullname}
                  </TableCell>
                  <TableCell >
                    {payment.cashAccount}
                  </TableCell>
                  <TableCell >
                    {payment.useOfFunds}
                  </TableCell>
                  <TableCell >
                    {numeral(payment.amount).format(`$0,0.00`)}
                  </TableCell>
                  <TableCell align="right">
                    {moment(payment.date_pmt).format('DD MMM, YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="/app/payments"
          endIcon={<NavigateNextIcon />}
        >
          See all
        </Button>
      </Box>
    </Card>
  );
};

PaymentsReceivedList.propTypes = {
  className: PropTypes.string
};

export default PaymentsReceivedList;
