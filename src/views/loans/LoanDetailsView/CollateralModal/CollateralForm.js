import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {DateTime} from 'luxon'
import {
  collateralTypesFormConstants,
  currentStatusFormConstants
} from 'src/utils/constants'
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  makeStyles, InputLabel, Select, FormHelperText, FormControl
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { handleAddNewCollateral } from 'src/actions/collaterals'
import { useSnackbar } from 'notistack';


const cashAccountsConstants = {
  'PERU': [
    { value: "RBPERU", label: "RBPERU" }
  ],
  'USA': [
    { value: "GCUS", label: "GCUS" },
    { value: "GFUS", label: "GFUS" },
  ],
  'VENEZUELA': [
    { value: "GCUS", label: "GCUS" },
    { value: "GFUS", label: "GFUS" },
  ],
  'DOMINICAN_REPUBLIC': [
    { value: "GCDR", label: "GCDR" }
  ]
}

const methodConstants = [
  { value: "CASH", label: "Efectivo" },
  { value: "CHECK", label: "Cheque" },
  { value: "DEPOSIT", label: "Deposito" },
  { value: "TRANSFER", label: "Transferencia" },
  { value: "CARD", label: "Tarjeta" },
  { value: "ZELLE", label: "Zelle" },
  { value: "YAPE", label: "Yape" }
]

const paymentTypeConstants = [
  { value: "REGULAR", label: 'Regular' },
  { value: "FULL", label: 'Completo - cierre prestamo' },
]

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const CollateralForm = ({ className, loan, commissionProfiles, onCollateral, info, ...rest }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        _loan: loan,
        type: collateralTypesFormConstants[0].value,
        registerDate: '',
        value: '',
        currentStatus: currentStatusFormConstants[0].value,
        serialNumber: '',
        model: '',
        modelNumber: '',
        color: '',
        dateOfManufacture: '',
        condition: '',
        address: '',
        description: '',
        registrationNumber: '',
        kilometrage: '',
        engineNumber: '',
      }}
      validationSchema={Yup.object().shape({
        // pct: Yup.number().moreThan(0, `El porcentaje debe de ser mayor que 0 o menor que ${100 - totalPct}`).max(100 -totalPct , `El porcentaje debe de ser mayor que 0 o menor que ${100 - totalPct}`).required('Es necesario el [porcentaje de comisión]'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
        resetForm
      }) => {
        try {
          await dispatch(handleAddNewCollateral(values))
          setStatus({ success: true });
          setSubmitting(false);
          resetForm()
          enqueueSnackbar('Colateral registrado exitosamente', {
            variant: 'success'
          })
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          enqueueSnackbar(`Error al registrar el colateral`, {
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
              xs={9}
              lg={9}
            >
              <Box mt={3}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
                      <Select
                        native
                        required
                        error={Boolean(touched.type && errors.type)}
                        value={values.type}
                        onChange={handleChange}
                        label="Tipo"
                        inputProps={{
                          name: 'type',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {collateralTypesFormConstants.map((e) => {
                          return (
                            <option key={e.value} value={e.value}>{e.label}</option>
                          )})
                        }
                      </Select>
                      <FormHelperText>{touched.type && errors.type}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.value && errors.value)}
                      fullWidth
                      required
                      helperText={touched.value && errors.value}
                      label="Valor ($)"
                      InputProps={{
                        startAdornment:(
                          <InputAdornment position="start">$</InputAdornment>)
                      }}
                      name="pct"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.value}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.registerDate && errors.registerDate)}
                      fullWidth
                      helperText={touched.registerDate && errors.registerDate}
                      label="Fecha de registro"
                      type="date"
                      name="registerDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.registerDate}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Estatus</InputLabel>
                      <Select
                        native
                        required
                        error={Boolean(touched.currentStatus && errors.currentStatus)}
                        value={values.currentStatus}
                        onChange={handleChange}
                        label="Estatus"
                        inputProps={{
                          name: 'currentStatus',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {currentStatusFormConstants.map((e) => {
                          return (
                            <option key={e.value} value={e.value}>{e.label}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.currentStatus && errors.currentStatus}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Descripción"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.model && errors.model)}
                      fullWidth
                      helperText={touched.model && errors.model}
                      label="Modelo"
                      name="model"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.model}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.color && errors.color)}
                      fullWidth
                      helperText={touched.color && errors.color}
                      label="Color"
                      name="color"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.color}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Condición</InputLabel>
                      <Select
                        native
                        error={Boolean(touched.condition && errors.condition)}
                        value={values.condition}
                        onChange={handleChange}
                        label="Condición"
                        inputProps={{
                          name: 'condition',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {[].map((e) => {
                          return (
                            <option key={e.value} value={e.value}>{e.label}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.condition && errors.condition}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      fullWidth
                      helperText={touched.address && errors.address}
                      label="Dirección"
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.registrationNumber && errors.registrationNumber)}
                      fullWidth
                      helperText={touched.registrationNumber && errors.registrationNumber}
                      label="# de registro"
                      name="registrationNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.registrationNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.kilometrage && errors.kilometrage)}
                      fullWidth
                      helperText={touched.kilometrage && errors.kilometrage}
                      label="kilometraje"
                      name="kilometrage"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.kilometrage}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.engineNumber && errors.engineNumber)}
                      fullWidth
                      helperText={touched.engineNumber && errors.engineNumber}
                      label="# de motor"
                      name="engineNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.engineNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.serialNumber && errors.serialNumber)}
                      fullWidth
                      helperText={touched.serialNumber && errors.serialNumber}
                      label="# de serial"
                      name="serialNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.serialNumber}
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
                      ? 'Agregar nuevo collateral'
                      : 'Guardar colateral'
                    }
                  </Button>
                </Box>
            </Grid>
            <Grid
              item
              xs={3}
              lg={4}
            >
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

CollateralForm.propTypes = {
  className: PropTypes.string
};

export default CollateralForm;
