import React, { } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoanInvestorsPosition } from '../../../actions/loans';



const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}


const tableContent = investor => {

  let investment = investor.entries?.['INVESTMENT'] || 0
  let ri = investor.entries?.['REBALANCING_INVESTMENT'] || 0
  let divestment = investor.entries?.['DIVESTMENT'] || 0
  let fee = investor.entries?.['FEE'] || 0
  let rd = investor.entries?.['REBALANCING_DIVESTMENT'] || 0
  let interest = investor.entries?.['INTEREST'] || 0
  let mii = investor.entries?.['MANAGEMENT_INTEREST_INCOME'] || 0
  let mfi = investor.entries?.['MANAGEMENT_FEE_INCOME'] || 0
  let mic = investor.entries?.['MANAGEMENT_INTEREST_COST'] || 0
  let mfc = investor.entries?.['MANAGEMENT_FEE_COST'] || 0
  let capital = investor.entries?.['CAPITAL'] || 0
  investment = investment + ri
  divestment = divestment + rd
  let position = (investment + divestment)*-1
  let cost = mic + mfc + (fee < 0 ? fee : 0)
  let income = mii + mfi + interest + (fee < 0 ? 0 : fee)
  return {
    fullName: investor.fullName,
    capital,
    investment,
    divestment,
    position,
    cost,
    income,
    operatingResult: income+cost,
    netIncome: +investment+divestment+capital+income+cost

  }
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const InvestmentTab = ({ className, loanId, ...rest }) => {
  const dispatch = useDispatch()
  const loanInvestors = useSelector((state) => state.loan.loanInvestors)
  const classes = useStyles()

  React.useEffect(() => {
    dispatch(handleLoanInvestorsPosition(loanId))
  }, [dispatch])

  console.log(loanInvestors)
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Resumen de inversión"
        />
        <Divider />
        <PerfectScrollbar>
          <Box >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    #
                  </TableCell>
                  <TableCell>
                    Inversor
                  </TableCell>
                  <TableCell>
                    Posición
                  </TableCell>
                  <TableCell>
                    Inversión
                  </TableCell>
                  <TableCell>
                    Venta
                  </TableCell>
                  <TableCell>
                    Capital
                  </TableCell>
                  <TableCell>
                    Ingresos
                  </TableCell>
                  <TableCell>
                    Egreso
                  </TableCell>
                  <TableCell style={{whiteSpace: 'nowrap'}}>
                    Ingreso Operativo
                  </TableCell>
                  <TableCell>
                    Utilidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanInvestors && loanInvestors.map((investor, index) => {
                  let {
                    fullName,
                    capital,
                    position,
                    divestment,
                    investment,
                    cost,
                    income,
                    operatingResult,
                    netIncome,
                  } = tableContent(investor)
                  return (
                    <TableRow
                      key={investor._id}
                    >
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {fullName}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(position,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(investment,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(divestment,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(capital,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(income,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(cost,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(operatingResult,'$')}
                      </TableCell>
                      <TableCell style={{whiteSpace: 'nowrap'}}>
                        {currencyFormat(netIncome,'$')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </div>
  );
};

InvestmentTab.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

InvestmentTab.defaultProps = {
  orders: []
};

export default InvestmentTab;
