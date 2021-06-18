import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import { useGetTodayStatus } from '../../../../hooks/useDashboard';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

let initialData = {
  datasets: [
    { data: [] }
  ],
  labels :[]
}

const EarningsSegmentation = ({ className, ...rest }) => {
  const classes = useStyles();
  const todayStatus = useGetTodayStatus('PERU');

  let rawConcepts = !todayStatus.isLoading ?todayStatus.data.disbursed.reduce((acc, e) =>  {
        const found = acc.find(j => j['useOfFunds'] === e['useOfFunds'])
        if (!found) {
          acc.push({
            useOfFunds: e.useOfFunds,
            capital: e.capital
          })
        } else {
          found.capital += e.capital
        }
        return acc
      }, []) : []

  let data = rawConcepts !== [] ? rawConcepts.map( e => e.capital) : []
  let labels = rawConcepts !== [] ?  rawConcepts.map(e => e.useOfFunds) : []



  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Earnings Segmentation"
      />
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={320}
      >
        <Chart data={data} labels={labels} />
      </Box>
      <Divider />
      <Box display="flex">
        {/*{earnings.labels.map((label, i) => (*/}
        {/*  <div*/}
        {/*    key={label}*/}
        {/*    className={classes.item}*/}
        {/*  >*/}
        {/*    <Typography*/}
        {/*      variant="h4"*/}
        {/*      color="textPrimary"*/}
        {/*    >*/}
        {/*      {earnings.datasets[0].data[i]}*/}
        {/*      %*/}
        {/*    </Typography>*/}
        {/*    <Typography*/}
        {/*      variant="overline"*/}
        {/*      color="textSecondary"*/}
        {/*    >*/}
        {/*      {label}*/}
        {/*    </Typography>*/}
        {/*  </div>*/}
        {/*))}*/}
      </Box>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
