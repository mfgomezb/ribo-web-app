import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const defaultPasswordValues = {
  newPassword: '',
  confirmPassword: ''
};

export default function Security({
  className,
  onSubmit,
  isLoading,
  initialValues = defaultPasswordValues,
  submitText,
  clearOnSubmit,
  ...rest
}) {
  const classes = useStyles();
  const [values, setValues] = React.useState(initialValues);

  const setValue = (field, value) =>
    setValues(old => ({ ...old, [field]: value }));

  const handleSubmit = e => {
    if (clearOnSubmit) {
      setValues(defaultPasswordValues);
    }
    e.preventDefault();
    onSubmit(values);
  };

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Change Password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="newPassword"
                onChange={e => setValue('newPassword', e.target.value)}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label="Password Confirmation"
                name="confirmPassword"
                onChange={e => setValue('confirmPassword', e.target.value)}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button
            color="secondary"
            disabled={isLoading}
            type="submit"
            variant="contained"
          >
            {submitText}
          </Button>
        </Box>
      </Card>
    </form>
  );
}

Security.propTypes = {
  className: PropTypes.string
};
