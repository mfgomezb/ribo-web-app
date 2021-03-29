import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const JobInfo = ({
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
      <CardHeader title="Información Laboral" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Estatus Laboral
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.employmentStatus}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Ingreso Mensual
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.monthlyIncome}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Frecuencia de pago
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.paymentFrequency}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Empleador
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.businessName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Cargo
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.businessPosition}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Dirección
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {customer.businessAddress}
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
      {/*  <Button startIcon={<AttachMoneyIcon />}>*/}
      {/*    Create Invoice*/}
      {/*  </Button>*/}
      {/*  <Button startIcon={<ReceiptIcon />}>*/}
      {/*    Resend Due Invoices*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Card>
  );
};

JobInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default JobInfo;
