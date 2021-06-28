import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const AdminGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && user.role !== 'admin') {
    if (user == '')
    return <Redirect to="/404" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AdminGuard.propTypes = {
  children: PropTypes.node
};

export default AdminGuard;
