import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles, Tooltip } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import numeral from 'numeral';
import {
  useGetInvestorAllocation,
  useGetInvestorHistoricInterest,
  useGetInvestorReturnYTD
} from '../../../hooks/useInvestor';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { percentageFormat } from '../../../utils/numbers';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
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

const Yield = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const periodPayments = useGetInvestorAllocation(investmentAccount)
  const historicIncome = useGetInvestorHistoricInterest(investmentAccount)
  const [dataLabels, setDataLabels] = React.useState([])
  const [data, setData] = React.useState()
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

        let returns = (result2.map( (e, i) => e/result1[i]).reduce( (acc, j) => acc + j) /slice)*12

        setDataLabels(array.slice(array.length-slice,array.length ))
        setData(returns)
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
        <Box flexGrow={1}>
          <Typography
            component="h3"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Interés
          </Typography>
          <Box display="flex" alignItems="left" flexDirection="column" flexWrap="wrap">
            <Tooltip title="Interés promedio de los ultimos doce meses anualizado" arrow>
            <Typography variant="h3" color="textPrimary">
              {periodPayments.isLoading && historicIncome.isLoading
                ? '...'
                : percentageFormat(data)}
            </Typography>
            {/*<Label*/}
            {/*  className={classes.label}*/}
            {/*  color={data.difference > 0 ? 'success' : 'error'}*/}
            {/*>*/}
            {/*  {data.difference > 0 ? '+' : ''}*/}
            {/*  {data.difference}%*/}
            {/*</Label>*/}
            </Tooltip>
          </Box>

        </Box>
        <Avatar className={classes.avatar}>
          <TrendingUpIcon />
        </Avatar>
      </Card>

  );
};

Yield.propTypes = {
  className: PropTypes.string
};

export default Yield;
