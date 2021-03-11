import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useLocationOptions from '../hooks/useUserLocation';

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const countries = useLocationOptions()

  if (isAuthenticated) {
    return <Redirect to="/app/reports/dashboard" />;
  }

  return (
    <>
      {children}
    </>
  );
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
