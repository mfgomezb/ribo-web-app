import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import { AttachMoneyIcon,
          Warning
} from '@material-ui/icons';
import Label from 'src/components/Label';
import { useGetTodayStatus } from '../../../hooks/useDashboard';

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

const LateCollection = ({ className, country, timeRange, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country, timeRange);

  return (
    <Card className={clsx(classes.root, className)}
          {...rest}>
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Cobranza Vencida
        </Typography>
        <Box display="flex" alignItems="left" flexDirection="column" flexWrap="wrap">
          <Typography variant="h3" color="textPrimary">
            $
            {queryPayments.isLoading
              ? '...' : queryPayments.data === undefined ? 0
              : (queryPayments.data.overdue.interest + queryPayments.data.overdue.principal).toFixed(2)}
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
        <Warning />
      </Avatar>
    </Card>
  );
};

LateCollection.propTypes = {
  className: PropTypes.string
};

export default LateCollection;
