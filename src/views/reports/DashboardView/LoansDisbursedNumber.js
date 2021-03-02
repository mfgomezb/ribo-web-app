import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Label from 'src/components/Label';
import { useLoansDisbursed } from '../../../hooks/useDashboard';

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

const LoansDisbursedNumber = ({ className, ...rest }) => {
  const queryLoansDisbursed = useLoansDisbursed('peru', 'week');

  const classes = useStyles();
  const data = {
    value: 12,
    difference: -10
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          # Prestamos desembolsados
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h3" color="textPrimary">
            {queryLoansDisbursed.isLoading || queryLoansDisbursed.isFetching
              ?  '...' : queryLoansDisbursed.data === undefined ? 0
                : queryLoansDisbursed.data.toFixed(2)}
          </Typography>
          <Label
            className={classes.label}
            color={data.difference > 0 ? 'success' : 'error'}
          >
            {data.difference > 0 ? '+' : ''}
            {data.difference}%
          </Label>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <ListAltIcon />
      </Avatar>
    </Card>
  );
};

LoansDisbursedNumber.propTypes = {
  className: PropTypes.string
};

export default LoansDisbursedNumber;
