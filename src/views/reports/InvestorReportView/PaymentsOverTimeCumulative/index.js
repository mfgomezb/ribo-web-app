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
import { useGetInvestorCumulativeIncome } from '../../../../hooks/useInvestor';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

const PaymentsOverTimeCumulative = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorCumulativeIncome(investmentAccount)

  const dataLabels = !periodPayments.isLoading ? Object.keys(periodPayments.data) : []

  const data = !periodPayments.isLoading ? Object.values(periodPayments.data): []


  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title="INGRESO ACUMULADO"
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

PaymentsOverTimeCumulative.propTypes = {
  className: PropTypes.string
};

export default PaymentsOverTimeCumulative;
