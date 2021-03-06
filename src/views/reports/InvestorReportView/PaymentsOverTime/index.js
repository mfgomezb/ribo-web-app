import React, { useCallback, useEffect } from 'react';
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
import { useGetInvestorHistoricIncome, useGetInvestorHistoricInterest } from '../../../../hooks/useInvestor';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

function Loading() {
  const variants = ['rect'];
  return (
    <div style={{'padding': '10px'}}>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton height={375}/>
        </Typography>
      ))}
    </div>
  );
}

const dataNormalization = (array,data) => {
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

const PaymentsOverTime = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorHistoricIncome(investmentAccount)
  const historicIncome = useGetInvestorHistoricInterest(investmentAccount)
  const isMountedRef = useIsMountedRef();
  const [dataLabels, setDataLabels] = React.useState([])
  const [data, setData] = React.useState([])

  // React.useEffect( () => {
  //   if (!periodPayments.isLoading && !historicIncome.isLoading) {
  //     let array = [...new Set([...Object.keys(periodPayments.data),...Object.keys(historicIncome.data)])]
  //     let result1 = setDataValues(dataNormalization(array, periodPayments.data))
  //     let result2 = setDataValues(dataNormalization(array, historicIncome.data))
  //
  //     setDataLabels(array)
  //     setData([result1, result2])
  //   }
  // }, [periodPayments, historicIncome])

  const getData = React.useCallback(async () => {
    try {
      if (isMountedRef.current && !periodPayments.isLoading && !historicIncome.isLoading) {
        let array = [...new Set([...Object.keys(periodPayments.data),...Object.keys(historicIncome.data)])]
        let result1 = setDataValues(dataNormalization(array.sort(), periodPayments.data))
        let result2 = setDataValues(dataNormalization(array.sort(), historicIncome.data))

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

  // if (periodPayments.isLoading || historicIncome.isLoading) return null

  // console.log(data)
  // console.log(dataLabels)
  // const dataLabels = !periodPayments.isLoading ? Object.keys(periodPayments.data) : []
  //
  // const data = !periodPayments.isLoading ?[Object.values(periodPayments.data)
  //   .map(e => e.monto)]: [[]]
  // console.log(data)
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title="INGRESOS"
      />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
              {(periodPayments.isLoading || historicIncome.isLoading) ? <Skeleton height={375} width={800}><Box height={375} minWidth={500}><Chart
                  className={classes.chart}
                  data={data}
                  labels={dataLabels}
                /></Box></Skeleton> :
                <Box height={375} minWidth={500}><Chart
                  className={classes.chart}
                  data={data}
                  labels={dataLabels}
                /></Box>}
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PaymentsOverTime.propTypes = {
  className: PropTypes.string
};

export default PaymentsOverTime;
