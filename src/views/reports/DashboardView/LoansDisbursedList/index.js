import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles, TableHead, TableRow, TableCell, Tooltip, TableSortLabel, TableBody, Table, Divider
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import { useGetTodayStatus } from '../../../../hooks/useDashboard';
import numeral from 'numeral';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  current: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
}));


const LoanDisbursedList = ({ className, country, timeRange, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country, timeRange);
  // const isMountedRef = useIsMountedRef();

  const totalAmount = queryPayments.data !== undefined ? queryPayments.data.disbursedDetails.reduce((acc, e) =>  {return acc + e.capital}, 0) : 0;
  const numberOfLoans = queryPayments.data !== undefined ? queryPayments.data.disbursedDetails.length : 0;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Typography
            color="inherit"
            variant="h3"
          >
            {numeral(totalAmount).format(`$0,0.00`)}
          </Typography>
        )}
        classes={{ action: classes.current }}
        subheader={`${numberOfLoans} préstamos desembolsado(s)`}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Préstamos"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      <Divider />
      <PerfectScrollbar>
      <Box height={350}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >
                Nombre
              </TableCell>
              <TableCell
                align="left"
                sortDirection="desc"
              >
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Capital
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Duración
              </TableCell>
              <TableCell >
                Interest
              </TableCell>
              <TableCell>
                Uso de los fondos
              </TableCell>
              <TableCell >
                Fecha
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!queryPayments.isLoading && queryPayments.data.disbursedDetails.map((payment) => (
              <TableRow
                hover
                key={payment._id}
              >
                <TableCell >
                  {payment.fullname}
                </TableCell>
                <TableCell >
                  {numeral(payment.capital).format(`$0,0.00`)}
                </TableCell>
                <TableCell >
                  {payment.duration}
                </TableCell>
                <TableCell >
                  {payment.interest}
                </TableCell>
                <TableCell >
                  {payment.useOfFunds}
                </TableCell>
                <TableCell align="right">
                  {moment(payment.startDate).format('DD MMM, YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="#"
          endIcon={<NavigateNextIcon />}
        >
          Ver todos
        </Button>
      </Box>
    </Card>
  );
};

LoanDisbursedList.propTypes = {
  className: PropTypes.string
};

export default LoanDisbursedList;
