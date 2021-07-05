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
  makeStyles, Typography
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetPayments } from '../../../../hooks/useDashboard';
import { useGetInvestorCumulativeIncome, useGetInvestorCumulativeInterest } from '../../../../hooks/useInvestor';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import Skeleton from '@material-ui/lab/Skeleton';


const Loading = (height) => {
  const variants = ['rect'];
  return (
    <div style={{'padding': '10px'}}>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton height={300}/>
        </Typography>
      ))}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

const dataNormalization = (array,data) => {
  return array.reduce( (acc, e) => {
    let newElement = data[e] ? data[e] : {monto: 0}
    acc[e] = {
      ...newElement,
    }
    return acc
  },{})};

const setDataValues = (arrayOfObjects) => {
  return Object.values(arrayOfObjects).map(e => e.monto)
};

const objectSort =  (unordered) => Object.keys(unordered).sort().reduce(
  (obj, key) => {
    obj[key] = unordered[key];
    return obj;
  },
  {}
);


const PaymentsOverTimeCumulative = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorCumulativeIncome(investmentAccount)
  const interestPayments = useGetInvestorCumulativeInterest(investmentAccount)
  const isMountedRef = useIsMountedRef();
  const [dataLabels, setDataLabels] = React.useState([])
  const [data, setData] = React.useState([])

  const getData = React.useCallback(async () => {
    try {
      if (isMountedRef.current && !periodPayments.isLoading && !interestPayments.isLoading) {

        let array = [...new Set([...Object.keys(periodPayments.data),...Object.keys(interestPayments.data)])]
        let result1 = setDataValues(dataNormalization(array.sort(), periodPayments.data))
        let result2 = setDataValues(dataNormalization(array.sort(), interestPayments.data))

        setDataLabels(array.sort())
        setData([
          result1,
          result2
        ])
      }
    } catch (err) {
      console.error(err);
    }
  }, [periodPayments, interestPayments]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  // if (periodPayments.isLoading || interestPayments.isLoading) return <Loading />


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
            {(periodPayments.isLoading || interestPayments.isLoading) ? <Loading height={375-20}/> :
              <Chart
                className={classes.chart}
                data={data}
                labels={dataLabels}
              />}
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
