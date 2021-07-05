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
  makeStyles, Tooltip, CardActions, Typography, Button
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useGetInvestorAllocation, useGetInvestorHistoricInterest } from '../../../../hooks/useInvestor';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  },
  cardAction: {
    paddingLeft: '30px'
  }
}));

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


const AllocationOverTime = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorAllocation(investmentAccount)
  const historicIncome = useGetInvestorHistoricInterest(investmentAccount)
  const [dataLabels, setDataLabels] = React.useState([])
  const [data, setData] = React.useState([])
  const isMountedRef = useIsMountedRef();

  const getData = React.useCallback(async () => {
    try {
      if (isMountedRef.current && !periodPayments.isLoading && !historicIncome.isLoading) {
        let allocationData = periodPayments.data.reduce((acc, e)=> {
          acc[e.date] = {'monto': e.valueAccumulated}
          return acc
          }, {})
        let array = [...new Set([...Object.keys(historicIncome.data),...Object.keys(allocationData)])]

        let result1 = setDataValues(dataNormalization(array.sort(), allocationData))
        let result2 = setDataValues(dataNormalization(array.sort(), historicIncome.data))

        result1 = result1.slice(Math.max(result1.length-13, 0),result1.length-1 )

        let slice = 12
        if (result1.length < 12) {
            slice = result1.length
        }
        result2 = result2.slice(result2.length-slice,result2.length )

        setDataLabels(array.slice(array.length-slice,array.length ))
        setData([
          result1,
          result2
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
        action={
          <Tooltip title="El monto colocado puede diferir con el monto de inversiones. Las colocaciones representan el monto colocado al comienzo del periodo. " arrow>
            <Button>INFO</Button>
          </Tooltip>
        }
        title={
          <Tooltip title="El rendimiento se calcula dividiendo las colocaciones al inicio del periodo y los interéses percibidos en durante el periodo " arrow>
            <p>Colocaciones, intereses y rendimiento</p>
          </Tooltip>
        }
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
