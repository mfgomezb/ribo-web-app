import React, {  } from 'react';
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
import { documentType, gender } from './FormConstants';

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
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        gender: customer.gender || 'MALE',
        placeOfBirth: customer.placeOfBirth || '',
        DOB: customer.DOB || '',
        nationalId: customer.nationalId || '',
        nationalIdType: customer.nationalIdType || 'PASSPORT',
        nationality: customer.nationality || '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('Nombre es requerido'),
        lastName: Yup.string().max(255).required('Apellido es requerido'),
        gender: Yup.string().max(255).required('Genero es requerido'),
        placeOfBirth: Yup.string().max(255).required('Lugar de nacimiento es requerido'),
        DOB: Yup.date().required('Fecha de nacimiento es requerido'),
        nationalId: Yup.string().required('Número de identidad es requerido'),
        nationalIdType: Yup.string().max(255).required('Tipo de documento es requerido'),
        nationality: Yup.string().max(255),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          console.log('values1: ', values)
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
            Información general
          </Typography>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Ingrese los detalles básicos del usuario que desea registrar
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
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="Nombres"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Apellidos"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor="outlined-age-native-simple">Genero</InputLabel>
                <Select
                  native
                  value={values.gender}
                  onChange={handleChange}
                  label="Genero"
                  inputProps={{
                    name: 'gender',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {gender.map((e) => {
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
              xs={12}>
              <TextField
                error={Boolean(touched.placeOfBirth && errors.placeOfBirth)}
                fullWidth
                helperText={touched.placeOfBirth && errors.placeOfBirth}
                label="Lugar de nacimiento"
                name="placeOfBirth"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.placeOfBirth}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.DOB && errors.DOB)}
                fullWidth
                helperText={touched.DOB && errors.DOB}
                label="Fecha de nacimiento"
                type="date"
                name="DOB"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.DOB}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.nationalId && errors.nationalId)}
                fullWidth
                helperText={touched.nationalId && errors.nationalId}
                label="Número de Documento"
                name="nationalId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationalId}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor="outlined-age-native-simple">Tipo de documento</InputLabel>
                <Select
                  native
                  value={values.nationalIdType}
                  onChange={handleChange}
                  label="Tipo de documento"
                  inputProps={{
                    name: 'nationalIdType',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {documentType.map((e) => {
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
                error={Boolean(touched.nationality && errors.nationality)}
                fullWidth
                helperText={touched.nationality && errors.nationality}
                label="Nacionalidad"
                name="nationality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationality}
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
