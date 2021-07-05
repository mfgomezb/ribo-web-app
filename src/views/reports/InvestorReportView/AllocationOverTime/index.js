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
  makeStyles,
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import {
  useGetInvestorAllocation,
  useGetInvestorCumulativeInterest,
  useGetInvestorHistoricInterest
} from '../../../../hooks/useInvestor';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

const dataNormalization = (array,data) => {
  console.log(array, data)
  return array.reduce( (acc, e) => {
    let newElement = data[e] ? data[e] : {monto: 0}
    acc[e] = {
      ...newElement,
    }
    return acc
  },{})}

const setDataValues = (arrayOfObjects) => {
  return Object.values(arrayOfObjects).map(e => e.monto)
}

const AllocationOverTime = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorAllocation(investmentAccount)
  const historicIncome = useGetInvestorHistoricInterest(investmentAccount)
  const [dataLabels, setDataLabels] = React.useState([])
  const [data, setData] = React.useState([])
  const isMountedRef = useIsMountedRef();

  // const dataLabels = !isLoading ? data.map( e => e.date).slice(data.length-12,data.length ) : []
  // const dataMap = !isLoading ? data.map(e => e.valueAccumulated).slice(data.length-12,data.length ): []

  const getData = React.useCallback(async () => {
    try {
      if (isMountedRef.current && !periodPayments.isLoading && !historicIncome.isLoading) {
        let array = [...new Set([...Object.keys(periodPayments.data),...Object.keys(historicIncome.data)])]
        let result1 = setDataValues(dataNormalization(array, periodPayments.data))
        let result2 = setDataValues(dataNormalization(array, historicIncome.data))

        setDataLabels(array.slice(array.length-12,array.length ),)
        setData([
          result1.slice(result1.length-12,result1.length ),
          result2.slice(result2.length-12,result2.length )
        ])
      }
    } catch (err) {
      console.error(err);
    }
  }, [periodPayments, historicIncome]);

  React.useEffect(() => {
    getData();
  }, [getData]);

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
