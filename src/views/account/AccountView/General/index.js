import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import { useUpdateUser } from 'src/hooks/useUser';

const useStyles = makeStyles(() => ({
  root: {}
}));

const General = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [updateUser, updateUserInfo] = useUpdateUser(user._id);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={user} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings
          user={user}
          onSubmit={updateUser}
          clearOnSubmit
          isLoading={updateUserInfo.isLoading}
          submitText={
            updateUserInfo.isLoading
              ? 'Saving...'
              : updateUserInfo.isError
              ? 'Error!'
              : updateUserInfo.isSuccess
              ? 'Saved!'
              : 'Save'
          }
        />
      </Grid>
    </Grid>
  );
};

General.propTypes = {
  className: PropTypes.string
};

export default General;
