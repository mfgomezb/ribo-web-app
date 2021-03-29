import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import GlobalPosition from 'src/views/customer/CustomerDetailsView/Investments/GlobalPosition';
import InvestmentPosition from 'src/views/customer/CustomerDetailsView/Investments/InvestmentPosition';
import ReturnsSummary from 'src/views/customer/CustomerDetailsView/Investments/ReturnsSummary';
import PortfolioSummary from 'src/views/customer/CustomerDetailsView/Investments/PortfolioSummary';

const useStyles = makeStyles((theme) => ({
  root: {},
  mt: {
    marginTop: theme.spacing(3)
  }
}));

const Details = ({
  customer,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={3}
        md={6}
        xl={3}
        xs={12}
      >
        <Grid item>
          <GlobalPosition customer={customer} />
        </Grid>
      </Grid>
      <Grid
        item
        lg={3}
        md={6}
        xl={3}
        xs={12}
      >
        <Grid item>
          <ReturnsSummary customer={customer}/>
        </Grid>
      </Grid>
      <Grid
        item
        lg={3}
        md={6}
        xl={3}
        xs={12}
      >
        <Grid item>
          <InvestmentPosition customer={customer}/>
        </Grid>
      </Grid>
      <Grid
        item
        lg={3}
        md={6}
        xl={3}
        xs={12}
      >
        <Grid item>
          <PortfolioSummary customer={customer}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Details;
