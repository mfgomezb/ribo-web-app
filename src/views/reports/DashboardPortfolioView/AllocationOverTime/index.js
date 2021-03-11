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
import { useGetHistoricAllocation } from '../../../../hooks/useDashboard';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

const AllocationOverTime = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const allocation = useGetHistoricAllocation(country)

  const dataLabels = !allocation.isLoading ? allocation.data.map( e => e.date).slice(allocation.data.length-12,allocation.data.length ) : []
  const data = !allocation.isLoading ? allocation.data.map(e => e.valueAccumulated).slice(allocation.data.length-12,allocation.data.length ): []

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title="Evolución de la cartera"
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

AllocationOverTime.propTypes = {
  className: PropTypes.string
};

export default AllocationOverTime;
