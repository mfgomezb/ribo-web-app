import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useGetPortfolioSummary } from '../../../hooks/useDashboard';
import { useOfFunds } from '../../../utils/constants';
import { currencyFormat } from '../../../utils/numbers';


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
  const { isLoading, data } = useGetPortfolioSummary(country)


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
                <TableCell>
                  Producto
                </TableCell>
                <TableCell align="right">
                  # de prestamos
                </TableCell>
                <TableCell align="right">
                  Monto
                </TableCell>
                <TableCell align="right">
                  Monto Promedio
                </TableCell>
                <TableCell align="right">
                  Capital Restante
                </TableCell>
                <TableCell align="right">
                  Restante promedio
                </TableCell>
                <TableCell align="right">
                  Ingresos
                </TableCell>
                <TableCell align="right">
                  Ingreso promedio
                </TableCell>
                <TableCell align="right">
                  R
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
              {!isLoading && <TableRow
                hover
              >
                <TableCell>
                  Cartera
                </TableCell>
                <TableCell align="right">
                  {data.portfolioTotals[0].countOpenLoans}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].capital, '$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].capital / data.portfolioTotals[0].countOpenLoans, '$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].capitalRemaining, '$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].avgCapitalRemaining, '$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].interestEarned, '$')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(data.portfolioTotals[0].avgInterestEarned, '$')}
                </TableCell>
                <TableCell align="right">
                  {data.portfolioTotals[0].isRestructured}
                </TableCell>
              </TableRow>}
              {!isLoading && data.portfolioSummary.map((product) => (

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
