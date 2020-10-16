import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles, Grid, FormControl, InputLabel, Select
} from '@material-ui/core';
import { location } from './FormConstants';

const useStyles = makeStyles((theme) => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2)
  },
  tag: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const CustomerInformationForm = ({
     className,
     onBack,
     onComplete,
     customer,
     ...rest
   }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        bank: customer.bank || '',
        accountNumber: customer.accountNumber || '',
        location: customer.location || 'GLOBAL',
      }}
      validationSchema={Yup.object().shape({
        bank: Yup.string().max(255),
        accountNumber: Yup.string().max(255),
        location: customer.investor ? Yup.string().max(255).required('Pais es requerido') : Yup.string().max(255),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);

          if (onComplete) {
            onComplete(values);
          }

        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Información de contacto
          </Typography>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Ingrese los detalles de contacto del usuario. El email debe ser único. Se debe de incluir una referencia de contacto
            </Typography>
          </Box>
          <Box mt={2}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.bank && errors.bank)}
                  fullWidth
                  helperText={touched.bank && errors.bank}
                  label="Banco"
                  name="bank"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bank}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  fullWidth
                  helperText={touched.accountNumber && errors.accountNumber}
                  label="Cuenta bancaria"
                  name="accountNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber}
                  variant="outlined"
                />
              </Grid>
              {customer.investor &&
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Región Inversor</InputLabel>
                <Select
                  native
                  value={values.location}
                  onChange={handleChange}
                  label="Región Inversor"
                  inputProps={{
                    name: 'location',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {location.map((e) => {
                    return (
                      <option value={e.value}>{e.label}</option>
                    )
                  })}
                </Select>
              </FormControl>
              }
            </Grid>
          </Box>
          <Box
            mt={6}
            display="flex"
          >
            {onBack && (
              <Button
                onClick={onBack}
                size="large"
              >
                Previous
              </Button>
            )}
            <Box flexGrow={1} />
            <Button
              color="secondary"
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              size="large"
            >
              Next
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

CustomerInformationForm.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

CustomerInformationForm.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default CustomerInformationForm;
