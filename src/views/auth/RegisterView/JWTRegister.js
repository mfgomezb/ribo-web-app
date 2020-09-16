import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTRegister = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Debe ser un email valido')
          .max(255)
          .required('El email es requerido'),
        name: Yup.string()
          .max(255)
          .required('El nombre es requerido'),
        password: Yup.string()
          .min(7)
          .max(255)
          .required('Contrasena requerida'),
        policy: Yup.boolean().oneOf(
          [true],
          'Debe de aceptar los termino y condiciones de Ribo'
        )
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(values.email, values.name, values.password);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
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
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Nombre"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Contraseña"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box alignItems="center" display="flex" mt={2} ml={-1}>
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography variant="body2" color="textSecondary">
              He leido y acepto los{' '}
              <Link component="a" href="#" color="secondary">
                terminos y condiciones
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Registrarse
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

JWTRegister.propTypes = {
  className: PropTypes.string
};

export default JWTRegister;
