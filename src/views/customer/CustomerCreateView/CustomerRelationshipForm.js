import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  makeStyles, Grid, FormControl, InputLabel, Select
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Plus as PlusIcon } from 'react-feather';
import { civilStatus, documentType } from './FormConstants';

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
        civilStatus: customer.civilStatus || 'SINGLE', //done
        spouseFullName: customer.spouseFullName || '', //done
        spouseNationalId: customer.spouseNationalId || '', //done
        spouseDOB: customer.spouseDOB || '', //done
        spousePlaceOfBirth: customer.spousePlaceOfBirth || '', //done
      }}
      validationSchema={Yup.object().shape({
        civilStatus: Yup.string().max(255),
        spouseFullName: Yup.string().max(255),
        spouseNationalId: Yup.string().max(255),
        spouseDOB: Yup.string().max(255),
        spousePlaceOfBirth: Yup.string().max(255),
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
                <FormControl fullWidth variant="outlined" >
                  <InputLabel htmlFor="outlined-age-native-simple">Estatus Civil</InputLabel>
                  <Select
                    error={Boolean(touched.civilStatus && errors.civilStatus)}
                    native
                    helperText={touched.civilStatus && errors.civilStatus}
                    value={values.civilStatus}
                    onChange={handleChange}
                    label="Estatus civil"
                    inputProps={{
                      name: 'civilStatus',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    {civilStatus.map((e) => {
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
                  error={Boolean(touched.spouseFullName && errors.spouseFullName)}
                  fullWidth
                  helperText={touched.spouseFullName && errors.spouseFullName}
                  label="Nombre completo pareja"
                  required={values.civilStatus === 'MARRIED' || values.civilStatus === 'CONCUBINE'}
                  name="spouseFullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.spouseFullName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}>
                <TextField
                  error={Boolean(touched.spousePlaceOfBirth && errors.spousePlaceOfBirth)}
                  fullWidth
                  helperText={touched.spousePlaceOfBirth && errors.spousePlaceOfBirth}
                  label="Lugar de nacimiento"
                  required={values.civilStatus === 'MARRIED' || values.civilStatus === 'CONCUBINE'}
                  name="spousePlaceOfBirth"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.spousePlaceOfBirth}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}>
                <TextField
                  error={Boolean(touched.spouseDOB && errors.spouseDOB)}
                  fullWidth
                  type="date"
                  helperText={touched.spouseDOB && errors.spouseDOB}
                  label="Fecha de nacimiento"
                  required={values.civilStatus === 'MARRIED' || values.civilStatus === 'CONCUBINE'}
                  name="spouseDOB"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.spouseDOB}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}>
                <TextField
                  error={Boolean(touched.spouseNationalId && errors.spouseNationalId)}
                  fullWidth
                  helperText={touched.spouseNationalId && errors.spouseNationalId}
                  label="Número de identificación"
                  required={values.civilStatus === 'MARRIED' || values.civilStatus === 'CONCUBINE'}
                  name="spouseNationalId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.spouseNationalId}
                  variant="outlined"
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
