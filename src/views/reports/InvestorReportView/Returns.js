import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import numeral from 'numeral';
// import moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useGetInvestorReturn } from '../../../hooks/useInvestor';

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

const Returns = ({ className, investmentAccount, ...rest }) => {
  const classes = useStyles();
  const investorReturn = useGetInvestorReturn(investmentAccount);

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
          Retorno
        </Typography>
        <Box display="flex" alignItems="left" flexDirection="column" flexWrap="wrap">
          <Typography variant="h3" color="textPrimary">
            {investorReturn.isLoading
              ? '...' : investorReturn.data === undefined ? 0 : numeral(investorReturn.data.value).format(`$0,0.00`)}
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
  );
};

Returns.propTypes = {
  className: PropTypes.string
};

export default Returns;
