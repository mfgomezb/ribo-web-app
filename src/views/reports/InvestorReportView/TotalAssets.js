import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles, Link } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useGetTodayStatus, } from '../../../hooks/useDashboard';
import numeral from 'numeral';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { useGetInvestorTotalAssets } from '../../../hooks/useInvestor';

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

const LateCollection = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetInvestorTotalAssets(investmentAccount);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Total activos
        </Typography>
        <Box display="flex" alignItems="left" flexDirection="column" flexWrap="wrap">
          <Typography color="inherit" variant="h3">
            {queryPayments.isLoading
              ? '...' : queryPayments.data === undefined ? 0
              : numeral(queryPayments.data.value).format(`$0,0.00`)}
          </Typography>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
};

LateCollection.propTypes = {
  className: PropTypes.string
};

export default LateCollection;
