import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import axios from 'src/utils/axios';
import getInitials from 'src/utils/getInitials';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useGetPayments, useGetPortfolioSummary } from '../../../hooks/useDashboard';
import { useOfFunds } from '../../../utils/constants';


const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}
const technologyMap = {
  'html-css': '/static/images/technologies/html.svg',
  'react-js': '/static/images/technologies/react-js.svg',
  'vue-js': '/static/images/technologies/vue-js.svg',
  angular: '/static/images/technologies/angular.svg',
  figma: '/static/images/technologies/figma.svg',
  sketch: '/static/images/technologies/sketch.svg'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  technology: {
    height: 30,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  cellWidthMd: {
    width: 150
  },
  cellWidthSm: {
    width: 50
  }
}));

const PaymentsReceivedList = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { isLoading, data, error } = useGetPortfolioSummary(country)


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title={`Resumen de la cartera por producto`}
      />
      <Divider />
      <PerfectScrollbar>
        <Box height={375} minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  >
                  Producto
                </TableCell>
                <TableCell align="right" >
                  # de prestamos
                </TableCell>
                <TableCell align="right" >
                  Monto
                </TableCell>
                <TableCell align="right" >
                  Monto Promedio
                </TableCell>
                <TableCell align="right" >
                  Capital Restante
                </TableCell>
                <TableCell align="right" >
                  Restante promedio
                </TableCell>

                <TableCell align="right" >
                  Ingreso generado
                </TableCell>
                <TableCell align="right" >
                  Ingreso promedio
                </TableCell>
                <TableCell align="right" >
                  # de reestructuraciones
                </TableCell>
                {/*<TableCell*/}
                {/*  align="right"*/}
                {/*  sortDirection="desc"*/}
                {/*>*/}
                {/*  <Tooltip*/}
                {/*    enterDelay={300}*/}
                {/*    title="Sort"*/}
                {/*  >*/}
                {/*    <TableSortLabel*/}
                {/*      active*/}
                {/*      direction="desc"*/}
                {/*    >*/}
                {/*      Fecha*/}
                {/*    </TableSortLabel>*/}
                {/*  </Tooltip>*/}
                {/*</TableCell>*/}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && data.map((product) => (

                <TableRow
                  hover
                  key={product.product}
                >
                  <TableCell>
                    {useOfFunds[product.product]}
                  </TableCell>
                <TableCell align="right">
                    {product.countOpenLoans}
                </TableCell>
                  <TableCell align="right">
                    {currencyFormat(product.capital, '$')}
                  </TableCell>
                  <TableCell align="right" >
                    {currencyFormat(product.capital/product.countOpenLoans, '$')}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(product.capitalRemaining,'$')}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(product.avgCapitalRemaining,'$')}
                  </TableCell>
                <TableCell align="right">
                    {currencyFormat(product.interestEarned,'$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(product.avgInterestEarned,'$')}
                </TableCell>
                <TableCell align="right">
                  {product.isRestructured}
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
          to="/app/payments"
          endIcon={<NavigateNextIcon />}
        >
          See all
        </Button>
      </Box>
    </Card>
  );
};

PaymentsReceivedList.propTypes = {
  className: PropTypes.string
};

export default PaymentsReceivedList;
