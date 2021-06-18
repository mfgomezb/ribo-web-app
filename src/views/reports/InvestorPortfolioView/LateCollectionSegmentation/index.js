import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, makeStyles, Typography } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetHistoricAllocation } from '../../../../hooks/useDashboard';
import { percentageFormat } from '../../../../utils/numbers';
import { useGetCollectionHistogram } from '../../../../hooks/useGetCollection';


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

const LateCollectionSegmentation = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const { isLoading: collectionIsLoading, data: collection, } = useGetCollectionHistogram(country)
  const { isLoading: portfolioIsLoading, data: portfolio, } = useGetHistoricAllocation(country)


  // const topThreeCat = !isLoading && data.portfolioSummary.slice(0, 3)
  const labels = !collectionIsLoading && Object.keys(collection)
  const productsData = !collectionIsLoading && Object.keys(collection).map( e =>  collection[e].amount)
  const portfolioTotal = !portfolioIsLoading ? portfolio[portfolio.length-1].valueAccumulated : 0
  // console.log(portfolio.length)
  console.log(portfolioTotal)
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

  console.log(products)

  if (collectionIsLoading) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Distribución de cobranza vencida"
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
              {!portfolioIsLoading && percentageFormat(collection[item].amount/portfolioTotal)}
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
