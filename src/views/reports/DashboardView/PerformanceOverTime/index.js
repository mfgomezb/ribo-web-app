import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetPayments } from '../../../../hooks/useDashboard';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

const PaymentsReceived = ({ className, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetPayments('PERU', 'month')


  const dataTotals = !periodPayments.isLoading ? periodPayments.data.periodCollections.reduce((acc, e) => {
    const found = acc.find(j => e.date === j.date)
    if (!found) {
      acc.push(e)
    } else {
      found.numero += e.numero
      found.monto += e.monto
    }
    return acc
  }, []) : 0

  const dataLabels = !periodPayments.isLoading ? dataTotals.map(e => e.date) : []
  const data = !periodPayments.isLoading ? dataTotals.map(e => e.monto) : []


  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title="Pagos Recibidos"
      />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
          <Box height={375} minWidth={500}>
            <Chart
              className={classes.chart}
              data={data}
              labels={dataLabels}
            />
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PaymentsReceived.propTypes = {
  className: PropTypes.string
};

export default PaymentsReceived;
