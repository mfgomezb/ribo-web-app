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
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import { useGetPortfolioSummary } from '../../../../hooks/useDashboard';
import numeral from 'numeral';
import {useOfFunds} from '../../../../utils/constants'


const percentageFormat = (number) => {
  return numeral(number).format(`0.00%`)
}
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

const EarningsSegmentation = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { isLoading, data, error } = useGetPortfolioSummary(country)


  const topThreeCat = !isLoading && data.slice(0, 3)
  const labels = !isLoading && data.map( e =>  e.product)
  const productsData = !isLoading && data.map( e =>  e.capitalRemaining)

  const products = {
    datasets: [{
      backgroundColor: ['#3d72eb', '#4b9e86', '#b658f5', '#3d72eb', '#4b9e86', '#b658f5', '#3d72eb', '#4b9e86', '#b658f5'],
      data: productsData
    }],
    labels
  }
  // const getEarnings = useCallback(async () => {
  //   try  {
  //     const response = await axios.get('/api/reports/earnings');
  //
  //     if (isMountedRef.current) {
  //       setEarnings(response.data.earnings);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getEarnings();
  // }, [getEarnings]);

  if (isLoading) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Distribución de Productos"
      />
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={320}
      >
        <Chart data={products} />
      </Box>
      <Divider />
      <Box display="flex">
        {topThreeCat.map((item, i) => (
          <div
            key={i}
            className={classes.item}
          >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {percentageFormat(item.capitalRemainingPct)}
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {useOfFunds[item.product]}
            </Typography>
          </div>
        ))}
      </Box>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
