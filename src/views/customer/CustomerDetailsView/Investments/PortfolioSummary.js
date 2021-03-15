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
import { currencyFormat } from '../../../../utils/numbers'

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
      <CardHeader title="Estado del Portafolio" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Número de préstamos
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                100
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Tasa de Interés*
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                8%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Préstamo promedio
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
              {currencyFormat(1000,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Inversión promedio
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h5"
                color="textSecondary"
              >
                {currencyFormat(100,'$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.fontWeightMedium}>
              Estado de la cartera
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Corriente
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(1200,'$')}
                <Label color="success">
                   +20%
                </Label>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              +30 días
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(200,'$')}
                <Label color="error">
                 +20%
                </Label>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              +60 días
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
              +90 días
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(100,'$')}
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
        <Typography
          variant="body2"
          color="textSecondary"
        >
        </Typography>
      </Box>
    </Card>
  );
};

GlobalPosition.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default GlobalPosition;
