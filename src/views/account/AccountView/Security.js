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
  makeStyles, FormHelperText
} from '@material-ui/core';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useAuth from '../../../hooks/useAuth';

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
  const isMountedRef = useIsMountedRef();
  const { changePassword } = useAuth()
  const [disabledSubmit, setDisabledSubmit] = React.useState(true)

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
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string()
          // .string()
          .required('Ingrese su nueva contraseña')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Mínimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y un caracter especial"
          ),
        confirmPassword: Yup.string().when("newPassword", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Ambas contraseñas deben de ser iguales"
          )
        })
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          let {
            newPassword,
            confirmPassword,
          } = values

          await changePassword({ newPassword, confirmPassword });

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
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title="Cambiar contraseña" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Contraseña"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box p={2}
                 display="flex"
                 justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                // fullWidth
                // size="large"
                type="submit"
                variant="contained"
              >
                {submitText}
              </Button>
            </Box>{' '}
          </Card>
        </form>
      )}
    </Formik>
  )
}

