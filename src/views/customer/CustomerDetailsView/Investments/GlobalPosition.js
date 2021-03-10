import React from 'react';
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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
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

const GlobalPosition = ({
  customer,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Resumen de cuenta" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Valor total
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                {currencyFormat(11000, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Inversión
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(10000, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Efectivo
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(1000, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Monto Depositado
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                {currencyFormat(-120, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Depósitos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(10000, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Retiros
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(-10120, '$')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button startIcon={<AccountBalanceWalletIcon />}>
          Nueva transacción
        </Button>
      </Box>
    </Card>
  );
};

GlobalPosition.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default GlobalPosition;
