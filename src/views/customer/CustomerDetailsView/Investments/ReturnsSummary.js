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
import Label from 'src/components/Label';
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
      <CardHeader title="Retornos" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Utilidad
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                {currencyFormat(900,'$')}
              <Label color="success">
                +20%
              </Label>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Ingreso por Intereses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(1200,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Ingresos varios
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(200,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Fee Administrativo
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(-200,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Costos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(-100,'$')}
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
          Ver detalles
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
