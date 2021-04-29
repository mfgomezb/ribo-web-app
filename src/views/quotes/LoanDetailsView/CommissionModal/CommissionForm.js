import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  Select,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddNewCommission } from 'src/actions/commissions';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const CommissionForm = ({ className, loan, commissionProfiles, onCommission, info, ...rest }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const commissions = useSelector( (state) => state.commission.commissions)
  const classes = useStyles();
  const filteredProfiles = commissionProfiles.filter(e => commissions.map( e => e._salesman).indexOf(e._id))
  const totalPct = (commissions.reduce((acc, e) => {
    return (acc + e.pct * 100);
  },0)) || 0

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        _salesman: filteredProfiles[0]?._id || '',
        _loan: loan,
        pct: 0
      }}
      validationSchema={Yup.object().shape({
        pct: Yup.number().moreThan(0, `El porcentaje debe de ser mayor que 0 o menor que ${100 - totalPct}`).max(100 -totalPct , `El porcentaje debe de ser mayor que 0 o menor que ${100 - totalPct}`).required('Es necesario el [porcentaje de comisión]'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
        resetForm
      }) => {
        try {
          await dispatch(handleAddNewCommission(values))
          setStatus({ success: true });
          setSubmitting(false);
          resetForm()
          enqueueSnackbar('Comisión registrada exitosamente', {
            variant: 'success'
          })
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          enqueueSnackbar(`Error al registrar la comisión`, {
              variant: 'error'
          });
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
      }) =>  (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={12}
            >
              <Box mt={3}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Perfil</InputLabel>
                      <Select
                        native
                        required
                        disabled={totalPct === 100 || filteredProfiles.length === 0}
                        error={Boolean(touched.method && errors.method)}
                        value={values._salesman}
                        onChange={handleChange}
                        label="Perfil"
                        inputProps={{
                          name: '_salesman',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {filteredProfiles.map((e) => {
                          return (
                            <option key={e._id} value={e._id}>{e.fullName}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.method && errors.method}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.pct && errors.pct)}
                      fullWidth
                      required
                      disabled={totalPct === 100 || filteredProfiles.length === 0}
                      helperText={touched.pct && errors.pct}
                      label="Comision (%)"
                      InputProps={{
                        startAdornment:(
                          <InputAdornment position="start">%</InputAdornment>)
                      }}
                      name="pct"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pct}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>
                <Box mt={2}
                     display="flex"
                     justifyContent="flex-end"
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || info.isLoading}
                  >
                    {info.isLoading
                      ? 'Agregando'
                      : info.isError
                      ? 'Error'
                      : info.isSuccess
                      ? 'Agregar nueva comisión'
                      : 'Agregar comisión'
                    }
                  </Button>
                </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

CommissionForm.propTypes = {
  className: PropTypes.string
};

export default CommissionForm;
