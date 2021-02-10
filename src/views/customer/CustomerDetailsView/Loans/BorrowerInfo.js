import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';
import { useParams } from 'react-router-dom';
import { useBorrowerCreditDetails, useBorrowerUnpaidSchedule } from '../../../../hooks/useLoans';
import numeral from 'numeral';

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

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
  const { isLoading, data, error } = useBorrowerCreditDetails(customerId)


  if (isLoading || error) {
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Información crediticia" />
        <Divider />
        ...loading
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
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Atrasado - X días
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
              Monto vencido
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                12000
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
                6000
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
                20000
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
                5000
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
                {data.interestRate} / {data.IRR}
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
                {data.duration} meses
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
