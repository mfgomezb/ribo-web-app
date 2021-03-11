import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetHistoricAllocation } from '../../../../hooks/useDashboard';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

const FinancialStats = ({ className, country, ...rest }) => {
  const classes = useStyles();

  const allocation = useGetHistoricAllocation(country)

  const dataLabels = !allocation.isLoading ? allocation.data.map( e => e.date).slice(allocation.data.length-12,allocation.data.length ) : []
  const interest = !allocation.isLoading ? allocation.data.map(e => e.interest).slice(allocation.data.length-12,allocation.data.length ): []
  const capital = !allocation.isLoading ? allocation.data.map(e => e.capital).slice(allocation.data.length-12,allocation.data.length ): []

  const stats = {
    interest: interest,
    capital: capital
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Evolución Interéses y Capital"
      />
      <Divider />
      <PerfectScrollbar>
        <Box
          minWidth={700}
          pt={4}
          pr={2}
          pl={2}
        >
          <Chart
            className={classes.chart}
            data={stats}
            labels={dataLabels}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

FinancialStats.propTypes = {
  className: PropTypes.string
};

export default FinancialStats;
