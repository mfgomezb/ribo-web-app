import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, makeStyles, Typography } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetHistoricAllocation } from '../../../../hooks/useDashboard';
import { percentageFormat } from '../../../../utils/numbers';
import { useGetInvestorPortfolioCollection, useGetInvestorTotalInvestments } from '../../../../hooks/useInvestor';


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

const LateCollectionSegmentation = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const { isLoading: collectionIsLoading, data: collection, } = useGetInvestorPortfolioCollection(investmentAccount)
  const queryPayments = useGetInvestorTotalInvestments(investmentAccount)


  // const topThreeCat = !isLoading && data.portfolioSummary.slice(0, 3)
  const labels = !collectionIsLoading && Object.keys(collection)
  const productsData = !collectionIsLoading && Object.keys(collection).map( e =>  collection[e].amount)
  const totalAmount = queryPayments.data !== undefined ? queryPayments.data.value : 0;

  const products = {
    datasets: [{
      backgroundColor: ['#3d72eb', '#4b9e86', '#b658f5', '#3d72eb', '#4b9e86', '#b658f5', '#3d72eb', '#4b9e86', '#b658f5'],
      data: productsData
    }],
    labels
  }


  if (collectionIsLoading) {
    return null
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Morosidad"
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
        {labels.map((item, i) => (
          <div
            key={i}
            className={classes.item}
          >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {!collectionIsLoading && percentageFormat(collection[item].amount/totalAmount)}
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {item}
            </Typography>
          </div>
        ))}
      </Box>
    </Card>
  );
};

LateCollectionSegmentation.propTypes = {
  className: PropTypes.string
};

export default LateCollectionSegmentation;
