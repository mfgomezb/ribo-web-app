import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const InvestorGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && user.role !== 'investor') {
    if (user === '') return <Redirect to="/404" />;
  }

  if (isAuthenticated && user.role === 'admin') {
    return <Redirect to="/app" />;
  }


  return (
    <>
      {children}
    </>
  );
};

InvestorGuard.propTypes = {
  children: PropTypes.node
};

export default InvestorGuard;
