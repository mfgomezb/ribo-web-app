import React, { } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  makeStyles, Grid
} from '@material-ui/core';
import { referenceRelationship } from './FormConstants';
import { checkEmail } from '../../../hooks/useUser';
import { country } from './FormConstants'

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
        email: customer.email || '',
        cellphoneNumber: customer.cellphoneNumber || '',
        country: customer.country || 'PERU',
        city: customer.city || '',
        address: customer.address || '',
        residenceName: customer.residenceName || '',
        residenceNumber: customer.residenceNumber || '',
        contactCellphoneNumber: customer.contactCellphoneNumber || '',
        contactName: customer.contactName || '',
        contactRelationship: customer.contactRelationship || 'FAMILY',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        cellphoneNumber: Yup.string().max(255).required('Telefono es requerido'),
        country: Yup.string().max(255).required('Pais es requerido'),
        city: Yup.string().max(255).required('Ciudad es requerido'),
        address: Yup.string().max(255).required('Dirección es requerida'),
        residenceName: Yup.string().max(255),
        residenceNumber: Yup.string().max(255),
        contactCellphoneNumber: Yup.string().max(255).required('Teléfono de referencia es requerido'),
        contactName: Yup.string().max(255).required('Nombre de referencia es requerido'),
        contactRelationship: Yup.string().max(255).required('Relación con la referencia'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
        setFieldError
      }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          let checkedEmail = await checkEmail(values.email)
          if (onNext && checkedEmail.status === 'valid email') {
            onNext(values);
          } else {
            setFieldError('email', 'El email ya está en uso');
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
              Ingrese los detalles de contacto del usuario. El email debe ser único. Se debe de incluir una referencia de contacto.
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
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.cellphoneNumber && errors.cellphoneNumber)}
                fullWidth
                helperText={touched.cellphoneNumber && errors.cellphoneNumber}
                label="Número de teléfono"
                name="cellphoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.cellphoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
                <Select
                  native
                  value={values.country}
                  onChange={handleChange}
                  label="País"
                  inputProps={{
                    name: 'country',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {country.map((e) => {
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
                error={Boolean(touched.city && errors.city)}
                fullWidth
                helperText={touched.city && errors.city}
                label="Ciudad/Estado"
                name="city"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Dirección"
                name="address"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.residenceName && errors.residenceName)}
                fullWidth
                helperText={touched.residenceName && errors.residenceName}
                label="Nombre de Residencia"
                name="residenceName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.residenceName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.residenceNumber && errors.residenceNumber)}
                fullWidth
                helperText={touched.residenceNumber && errors.residenceNumber}
                label="Número de Casa/Apto"
                name="residenceNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.residenceNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.contactName && errors.contactName)}
                fullWidth
                helperText={touched.contactName && errors.contactName}
                label="Persona de referencia"
                required
                name="contactName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.contactCellphoneNumber && errors.contactCellphoneNumber)}
                fullWidth
                helperText={touched.contactCellphoneNumber && errors.contactCellphoneNumber}
                label="Teléfono de referencia"
                required
                name="contactCellphoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactCellphoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Relación</InputLabel>
                <Select
                  native
                  value={values.contactRelationship}
                  onChange={handleChange}
                  label="Relación"
                  inputProps={{
                    name: 'contactRelationship',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {referenceRelationship.map((e) => {
                    return (
                      <option value={e.value}>{e.label}</option>
                    )
                  })}
                </Select>
              </FormControl>
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
