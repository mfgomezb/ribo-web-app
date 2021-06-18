import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles, Link } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useGetTodayStatus, } from '../../../hooks/useDashboard';
import numeral from 'numeral';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

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

const LateCollection = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country);

  return (
    <Link
      component={RouterLink}
      to={`/app/reports/collections?page=3&limit=10&query=&minDays=-30&maxDays=-1&selectedDate=${moment().add(30, 'days').format('YYYY-MM-DD')}&country=${country}`}
      underline="none"
    >
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
              : numeral(queryPayments.data.upcoming.interest + queryPayments.data.upcoming.principal).format(`$0,0.00`)}
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

LateCollection.propTypes = {
  className: PropTypes.string
};

export default LateCollection;
