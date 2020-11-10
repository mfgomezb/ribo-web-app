
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  TableBody,
  makeStyles, Table, TableHead, TableRow, TableCell, IconButton, SvgIcon
} from '@material-ui/core';
import numeral from 'numeral';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 as DeleteIcon } from 'react-feather';
import {handleRemoveCommission} from '../../../../actions/commissions';

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
                        profiles,
                        ...rest
                      }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const commissions = useSelector((state) => state.commission.commissions)

  const handleDelete = async (commission) => {
    await dispatch(handleRemoveCommission(commission._id, commission._loan ))
  }

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
              <TableCell>
                Porcentaje
              </TableCell>
              <TableCell align="right">
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commissions.map( (commission, index) => {
              return (
                <TableRow key={commission?._id}>
                  <TableCell>
                    {index+1}
                  </TableCell>
                  <TableCell>
                    {commission?.fullName}
                  </TableCell>
                  <TableCell>
                    {commission?.pct * 100}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(commission)}>
                      <SvgIcon fontSize="small">
                        <DeleteIcon />
                      </SvgIcon>
                    </IconButton>
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









