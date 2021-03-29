import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DateTime } from 'luxon';
import { rounder } from '../../../../utils/numbers';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  Select,
  TextField
} from '@material-ui/core';
import { postRestructureLoan } from '../../../../utils/API';
import ScheduleTable from '../../LoanCreateView/ScheduleTable';
import {
  amortizationMethod as amortizationMethodConstants,
  paymentFrequency as paymentFrequencyConstants
} from '../../LoanCreateView/FormConstants';
import { handleLoanInitialData } from '../../../../actions/loans';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const LoanCreateForm = ({ className, isRestructure, capitalToRestructure, ...rest }) => {
  const {loanId} = useParams()
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      initialValues={{
        capital:  rounder(capitalToRestructure, 4) || '',
        numberOfInstallments:'', //done
        paymentFrequency: 'monthly',
        interestOnlyPeriods:0,
        startDate: DateTime.local().toString().slice(0,10),
        firstPaymentDate: '',
        interestRate:'',
        amortizationMethod:'lineal',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        capital: Yup.number().positive('El valor del prestamo debe de ser positivo').required('El valor del prestamo debe de ser positivo'),
        numberOfInstallments: Yup.number().moreThan(0, 'Las cuotas deben de ser igual o mayor que 1').required('Es necesario el número de cuotas'),
        interestOnlyPeriods: Yup.number()
          .min(0, 'Las cuotas sin intereses no pueden ser negativas')
          .when('numberOfInstallments', (numberOfInstallments, schema) => {
            if (numberOfInstallments > 1){
              return schema.min(0, 'Las cuotas sin intereses deben de ser igual o mayor que 0').max(numberOfInstallments-1, 'Las cuotas sin intereses deben de ser menor que numero de cuotas')
            } else {
              return schema.max(0, 'Si se amortiza en un sola cuota tienen que haber intereses')
            }
          }),
        startDate: Yup.date().required(),
        firstPaymentDate: Yup.date().when('startDate', (startDate, schema) => {

          let date = new Date(startDate)
          date.setDate(date.getDate() + 1)

          if (date) return schema.min(date, 'La fecha del primer pago debe de ser mayor que la fecha de inicio')
        }),
        interestRate: Yup.number().moreThan(0, 'Las tasa de interes debe de ser mayor que cero').required('Es necesario ingresar la tasa de interés'),
        amortizationMethod: Yup.mixed().oneOf(amortizationMethodConstants.map(e => e.value)).required('Es necesario seleccionar un metodo de amortización'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          setStatus({ success: true });
          setSubmitting(false);
          await postRestructureLoan(loanId, values)
          await dispatch(handleLoanInitialData(loanId))

          enqueueSnackbar('Prestamo restructurado', {
            variant: 'success'
          });


        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          enqueueSnackbar('Fallo al restructurar el prestamo', {
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
              lg={7}
            >
                <Card>
                  <CardHeader title="Especificaciones del cronograma de pago" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.capital && errors.capital)}
                          fullWidth
                          required
                          helperText={touched.capital && errors.capital}
                          label="Capital"
                          name="capital"
                          disabled={isRestructure}
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.capital}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.numberOfInstallments && errors.numberOfInstallments)}
                          fullWidth
                          required
                          helperText={touched.numberOfInstallments && errors.numberOfInstallments}
                          label="Número de cuotas"
                          name="numberOfInstallments"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.numberOfInstallments}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" >
                          <InputLabel htmlFor="outlined-age-native-simple">Frecuencia de pago</InputLabel>
                          <Select
                            native
                            required
                            error={Boolean(touched.paymentFrequency && errors.paymentFrequency)}
                            value={values.paymentFrequency}
                            onChange={handleChange}
                            label="Frecuencia de pago"
                            inputProps={{
                              name: 'paymentFrequency',
                              id: 'outlined-pf-native-simple',
                            }}
                          >
                            {paymentFrequencyConstants.map((e) => {
                              return (
                                <option value={e.value}>{e.label}</option>
                              )
                            })}
                          </Select>
                          <FormHelperText>{touched.paymentFrequency && errors.paymentFrequency}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.interestOnlyPeriods && errors.interestOnlyPeriods)}
                          fullWidth
                          required
                          helperText={touched.interestOnlyPeriods && errors.interestOnlyPeriods}
                          label="Cuotas de solo interés"
                          name="interestOnlyPeriods"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.interestOnlyPeriods}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.startDate && errors.startDate)}
                          fullWidth
                          required
                          helperText={touched.startDate && errors.startDate ? errors.startDate
                            : 'Fecha en la que se realiza el desembolso e inicio del acarreo de intereses.'}
                          label="Fecha de inicio"
                          name="startDate"
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.startDate}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.firstPaymentDate && errors.firstPaymentDate)}
                          fullWidth
                          helperText={touched.firstPaymentDate && errors.firstPaymentDate ? errors.firstPaymentDate
                            : 'Fecha del primer pago a realizar. Debe de ser mayor a la fecha de inicio.'}
                          label="Fecha de primer pago"
                          name="firstPaymentDate"
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstPaymentDate}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.interestRate && errors.interestRate)}
                          fullWidth
                          required
                          helperText={touched.interestRate && errors.interestRate ? errors.interestRate
                            : 'La tasa de interés debe de ser mensual.'}
                          label="Tasa de interés"
                          name="interestRate"
                          InputProps={{
                            startAdornment:(
                              <InputAdornment position="start">%</InputAdornment>)
                          }}
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.interestRate}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" >
                          <InputLabel htmlFor="outlined-age-native-simple">Método de amortización</InputLabel>
                          <Select
                            native
                            required
                            error={Boolean(touched.amortizationMethod && errors.amortizationMethod)}
                            value={values.amortizationMethod}
                            onChange={handleChange}
                            label="Método de amortización"
                            inputProps={{
                              name: 'amortizationMethod',
                              id: 'outlined-am-native-simple',
                            }}
                          >
                            {amortizationMethodConstants.map((e) => {
                              return (
                                <option value={e.value}>{e.label}</option>
                              )
                            })}
                          </Select>
                          <FormHelperText>{touched.amortizationMethod && errors.amortizationMethod ? errors.interestRate
                            : <ul>
                              <li> El método flat mantiene el interés constante.</li>
                              <li> El método lineal incrementa los pagos de capital y disminuye el interés.</li>
                              <li> El método bullet amortiza la totalidad del capital en la última cuota.</li>
                            </ul>
                          }</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
            </Grid>
            <Grid
              item
              xs={12}
              lg={5}
            >
                <Card>
                  <CardHeader title="Cronograma de pago" />
                  <Divider />
                  <CardContent>
                    <ScheduleTable
                      numberOfInstallments={values.numberOfInstallments}
                      interestRate={values.interestRate}
                      interestOnlyPeriods={values.interestOnlyPeriods}
                      capital={values.capital}
                      method={values.amortizationMethod}
                      paymentFrequency={values.paymentFrequency}
                      startDate={values.startDate}
                      firstPaymentDate={values.firstPaymentDate}
                    />
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Restructurar prestamo
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

LoanCreateForm.propTypes = {
  className: PropTypes.string
};

export default LoanCreateForm;
