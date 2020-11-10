
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  TableBody,
  makeStyles, Table, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { DateTime } from 'luxon';
import numeral from 'numeral';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  listIcon: {
    marginRight: theme.spacing(3)
  }
}));

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const CommissionList = ({
                        className,
                        ...rest
                      }) => {
  const classes = useStyles();
  const commissions = useSelector((state) => state.commission.commissions)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                #
              </TableCell>
              <TableCell>
                Perfil
              </TableCell>
              <TableCell align="right">
                Porcentaje
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commissions.map( (commission, index) => {
              return (
                <TableRow key={commission._id}>
                  <TableCell>
                    {index+1}
                  </TableCell>
                  <TableCell>
                    {commission.fullName}
                  </TableCell>
                  <TableCell align="right">
                    {commission.pct * 100}
                  </TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

CommissionList.propTypes = {
  className: PropTypes.string,
};

export default CommissionList;









