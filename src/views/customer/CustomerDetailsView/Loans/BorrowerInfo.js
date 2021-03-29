import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import Label from 'src/components/Label';
import { useParams } from 'react-router-dom';
import {
  useBorrowerCreditDetails,
  useBorrowerInterestGenerated,
  useBorrowerOwedStatus,
  useBorrowerUnpaidSchedule
} from '../../../../hooks/useLoans';
import { DateTime } from 'luxon';
import Skeleton from '@material-ui/lab/Skeleton';
import { currencyFormat } from '../../../../utils/numbers';

const variants = ['h1', 'h3', 'body1', 'caption'];

function Loading() {

  return (
    <div style={{'padding': '10px'}}>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton />
        </Typography>
      ))}
    </div>
  );
}


const getDaysBehind = (date) => {
  let end = DateTime.fromISO(date);
  let start = DateTime.local();
  return Math.round(end.diff(start, 'days').days);
}

const scheduleStatus = dayDiff => {
  if (dayDiff >= 0) {
    return 'PENDING'
  } else if (dayDiff < 0 && dayDiff >= -5) {
    return 'GRACE'
  } else {
    return 'OVERDUE'
  }
}

const getStatusLabel = (dayDiff) => {
  let status = scheduleStatus(dayDiff)

  const map = {
    OVERDUE: {
      text: 'VENCIDO',
      color: 'error'
    },
    PENDING: {
      text: 'AL DIA',
      color: 'success'
    },
    GRACE: {
      text: 'GRACIA',
      color: 'warning'
    },
  };

  const { text, color } = map[status];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};



const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const BorrowerInfo = ({
  customer,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const {customerId} = useParams()
  const [upcomingPayment, setUpcomingPayments] = useState(0)
  const { isLoading, data, error } = useBorrowerCreditDetails(customerId)
  const { isLoading: isLoadingUpcomingPayments, data: dataUpcomingPayments } = useBorrowerUnpaidSchedule(customerId)
  const { isLoading: isLoadingInterest, data: interestData } = useBorrowerInterestGenerated(customerId)
  const { isLoading: isLoadingOwed, data: owedData } = useBorrowerOwedStatus(customerId)


  React.useEffect( () => {
    if (!isLoadingUpcomingPayments) {
      let totalUpcoming = dataUpcomingPayments
        .filter( pmt => DateTime.fromISO(pmt.date) >= DateTime.local())
        .reduce( (acc, pmt) => {return acc + pmt.interest + pmt.principal}, 0)
      setUpcomingPayments(totalUpcoming)
    }

  }, [dataUpcomingPayments])


  if (isLoading || isLoadingUpcomingPayments ||isLoadingInterest || error) {
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Información crediticia" />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <Loading/>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    )
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Información crediticia" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Estatus
            </TableCell>
            <TableCell align="right">
              {!isLoadingOwed ? getStatusLabel(getDaysBehind(owedData.firstUnpaidInstallment)) : 0}
              <Typography
                variant="body2"
                color="textSecondary"
              >
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Monto vencido
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {!isLoadingOwed ?
                  currencyFormat(owedData.hasOwnProperty('totalOwed') ? owedData.totalOwed : 0 , 'USD') : 0}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Proximos vencimientos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(upcomingPayment, 'USD')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Total Prestado
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(data.lend,'USD')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Repagado
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(data.repaid,'USD')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Balance de capital
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(data.balance,'USD')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Intereses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(interestData,'USD')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Mora
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                0
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Tasa promedio / IRR
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {Math.round(data.interestRate)*100/100 } / {Math.round(data.IRR)*100/100}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Plazo promedio
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {Math.round(data.duration)*100/100} meses
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*<Box*/}
      {/*  p={1}*/}
      {/*  display="flex"*/}
      {/*  flexDirection="column"*/}
      {/*  alignItems="flex-start"*/}
      {/*>*/}
      {/*  <Button startIcon={<LockOpenIcon />}>*/}
      {/*    Reset &amp; Send Password*/}
      {/*  </Button>*/}
      {/*  <Button startIcon={<PersonIcon />}>*/}
      {/*    Login as Customer*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Card>
  );
};

BorrowerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default BorrowerInfo;
