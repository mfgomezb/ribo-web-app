import React, { } from 'react';
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
import {employmentStatus } from './FormConstants';

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
                                   onNext,
                                   customer,
                                   ...rest
                                 }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        employmentStatus: customer.employmentStatus || 'INDEPENDENT', //done
        monthlyIncome: customer.monthlyIncome || '', //done
        businessName: customer.businessName || '', //done
        businessAddress: customer.businessAddress || '', //done
        businessPosition: customer.businessPosition || '', //done
        startDate: customer.startDate || '', //done
      }}
      validationSchema={Yup.object().shape({
        employmentStatus: Yup.string().max(255).required('Estatus laboral es requerido'),
        monthlyIncome: Yup.number().required('Ingreso mensual es requerido').positive(),
        businessName: Yup.string().max(255),
        businessAddress: Yup.string().max(255),
        businessPosition: Yup.string().max(255),
        startDate: Yup.date(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);

          if (onNext) {
            onNext(values);
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
            Información Laboral
          </Typography>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Ingrese los detalles laborales del cliente. Recuerde que los ingresos deben de ser mensuales y en USD.
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
                <FormControl fullWidth variant="outlined" >
                  <InputLabel htmlFor="outlined-age-native-simple">Estatus laboral</InputLabel>
                  <Select
                    error={Boolean(touched.employmentStatus && errors.employmentStatus)}
                    native
                    helperText={touched.employmentStatus && errors.employmentStatus}
                    value={values.employmentStatus}
                    onChange={handleChange}
                    label="Estatus laboral"
                    inputProps={{
                      name: 'employmentStatus',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    {employmentStatus.map((e) => {
                      return (
                        <option value={e.value}>{e.label}</option>
                      )
                    })}
                  </Select>
              </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.monthlyIncome && errors.monthlyIncome)}
                  fullWidth
                  helperText={touched.monthlyIncome && errors.monthlyIncome}
                  label="Ingreso mensual (USD)"
                  name="monthlyIncome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.monthlyIncome}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.businessName && errors.businessName)}
                  fullWidth
                  helperText={touched.businessName && errors.businessName}
                  label="Empresa"
                  name="businessName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.businessAddress && errors.businessAddress)}
                  fullWidth
                  helperText={touched.businessAddress && errors.businessAddress}
                  label="Dirección de la empresa"
                  name="businessAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessAddress}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.businessPosition && errors.businessPosition)}
                  fullWidth
                  helperText={touched.businessPosition && errors.businessPosition}
                  label="Cargo"
                  name="businessPosition"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessPosition}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.startDate && errors.startDate)}
                  fullWidth
                  helperText={touched.startDate && errors.startDate}
                  label="Fecha de inicio"
                  type="date"
                  name="startDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.startDate}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
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
