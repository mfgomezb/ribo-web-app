import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles, Link } from '@material-ui/core';
import { useGetTodayStatus } from '../../../hooks/useDashboard';
import numeral from 'numeral';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

const Returns = ({ className, country, timeRange, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country, timeRange);

  return (
    <Link
      component={RouterLink}
      to={`/app/reports/collections?page=3&limit=10&query=&minDays=1&maxDays=360&selectedDate=${moment().format('YYYY-MM-DD')}&country=${country}`}
      underline="none"
    >
    <Card className={clsx(classes.root, className)}
          {...rest}>
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Retorno
        </Typography>
        <Box display="flex" alignItems="left" flexDirection="column" flexWrap="wrap">
          <Typography variant="h3" color="textPrimary">
            {queryPayments.isLoading
              ? '...' : queryPayments.data === undefined ? 0
              : numeral(queryPayments.data.overdue.interest + queryPayments.data.overdue.principal).format(`$0,0.00`)}
          </Typography>
          {/*<Label*/}
          {/*  className={classes.label}*/}
          {/*  color={data.difference > 0 ? 'success' : 'error'}*/}
          {/*>*/}
          {/*  {data.difference > 0 ? '+' : ''}*/}
          {/*  {data.difference}%*/}
          {/*</Label>*/}
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar>
    </Card>
    </Link>
  );
};

Returns.propTypes = {
  className: PropTypes.string
};

export default Returns;
