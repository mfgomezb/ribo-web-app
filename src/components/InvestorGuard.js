import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const InvestorGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
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
