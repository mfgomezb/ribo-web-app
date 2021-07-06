import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user.role === 'admin') {
    return <Redirect to="/app/reports/dashboard" />;
  }

  if (isAuthenticated && user.role === 'investor') {
    return <Redirect to="/investor/dashboard" />;
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
