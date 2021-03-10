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
      <CardHeader title="Inversiones" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Monto invertido
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                {currencyFormat(10000,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.fontWeightMedium}>
              Distribución de plazos colocación
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              1-3 Meses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                20%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              4-11 Meses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                80%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              12+ meses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                0%
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
                8 m.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.fontWeightMedium}>
              Distribución de productos - Top 3
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Motos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                40%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Vehículos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                40%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Nómina
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                20%
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
