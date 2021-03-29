import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Button, Grid, Link, makeStyles, SvgIcon, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Edit as EditIcon } from 'react-feather';
import { currencyFormat } from '../../../utils/numbers';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));


const Header = ({ className, details, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Préstamos
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.root}
        >
          {`${details?.fullName ?? ''} - ${currencyFormat(details?.capital ?? 0)} - ${details?.startDate ?? 0}`}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to={`/app/management/customers/${details?._borrower}`}
          startIcon={
            <SvgIcon fontSize="small">
              <EditIcon />
            </SvgIcon>
          }
        >
          Ver cliente
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Header;
