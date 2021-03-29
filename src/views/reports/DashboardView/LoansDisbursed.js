import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, makeStyles, Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useGetTodayStatus } from '../../../hooks/useDashboard';
import numeral from 'numeral';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
}));

const LoansDisbursed = ({ className, country, timeRange, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country, timeRange);

  const totalAmount = queryPayments.data !== undefined ? queryPayments.data.disbursedDetails.reduce((acc, e) =>  {return acc + e.capital}, 0) : 0;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Desembolsos
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography color="inherit" variant="h3">
            {numeral(totalAmount).format(`$0,0.00`)}
          </Typography>
        </Box>
      </Box>
      <Avatar className={classes.avatar} color="inherit">
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
};

LoansDisbursed.propTypes = {
  className: PropTypes.string
};

export default LoansDisbursed;
