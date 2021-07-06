import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, makeStyles, Typography } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useOfFunds } from '../../../../utils/constants';
import { percentageFormat } from '../../../../utils/numbers';
import { useGetInvestorPortfolioSegmentation, useGetInvestorTotalInvestments } from '../../../../hooks/useInvestor';


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

const EarningsSegmentation = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const { isLoading, data } = useGetInvestorPortfolioSegmentation(investmentAccount)

  const topThreeCat = !isLoading && data.slice(0, 3)
  const labels = !isLoading && data.map( e =>  e._id)
  const productsData = !isLoading && data.map( e =>  e.currentInvestment)
  const totalAmount = !isLoading && data.reduce( (a, b) =>  a + b.currentInvestment, 0)
  //
  const products = {
    datasets: [{
      backgroundColor: ['#3d72eb', '#4b9e86', '#b658f5', '#eb80eb', '#4b9e86', '#b658f5', '#3d72eb', '#4b9e86', '#eb80eb'],
      data: productsData
    }],
    labels
  }

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
              {percentageFormat(item.currentInvestment / totalAmount)}
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {useOfFunds[item._id]}
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
