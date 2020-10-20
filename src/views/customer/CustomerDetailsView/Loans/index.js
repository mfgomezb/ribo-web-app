import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Grid, makeStyles, SvgIcon } from '@material-ui/core';
import BorrowerInfo from './BorrowerInfo';
import LoansInfo from './LoansInfo';
import ScheduleInfo from './ScheduleInfo';
import { Link as RouterLink } from 'react-router-dom';
import { Plus as PlusIcon } from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {}
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
          <BorrowerInfo customer={customer} />
        </Grid>
        <Box mt={2} item>
          <Button
            color="secondary"
            variant="contained"
            component={RouterLink}
            to={`/app/management/customers/${customer._id}/new-loan`}
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
          >
            Nuevo prestamo
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        container
        lg={9}
        md={6}
        xl={3}
        xs={12}
        spacing={3}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
        <ScheduleInfo customer={customer} />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <LoansInfo customer={customer} />
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
