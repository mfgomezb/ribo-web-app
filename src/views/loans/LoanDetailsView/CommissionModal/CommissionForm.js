import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {DateTime} from 'luxon'
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  makeStyles, InputLabel, Select, FormHelperText, FormControl
} from '@material-ui/core';
import { useSelector } from 'react-redux';


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

const PaymentForm = ({ className, onPayment, info, ...rest }) => {
  const installmentDetails = useSelector((state) => state.loan.installmentDetails)
  let {principal, interest, principal_pmt, interest_pmt, status} = installmentDetails
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        _loanSchedule: installmentDetails._id,
        _loan: installmentDetails._loan,
        currency: installmentDetails.currency,
        amount: (status === 'PAID') ? 0: (principal+interest-principal_pmt-interest_pmt),
        comment: '',
        reference: '',
        cashAccount: cashAccountsConstants[installmentDetails.country][0]['value'],
        paymentType: 'REGULAR',
        method: 'TRANSFER',
        date_pmt: DateTime.local().toString().slice(0,16),
      }}
      validationSchema={Yup.object().shape({
        date_pmt: Yup.date().when('startDate', (startDate, schema) => {
          let date = new Date()
          date.setDate(date.getDate() + 1)
          if (date) return schema.max(date, 'Fecha maxima día+1')
        }),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
        resetForm
      }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);

          if (onPayment) {
            let payment = await onPayment(values);
            if (payment) {
              resetForm()
            }
          }

        } catch (err) {
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
                    <TextField
                      error={Boolean(touched.amount && errors.amount)}
                      fullWidth
                      required
                      disabled={status === 'PAID'}
                      helperText={touched.amount && errors.amount}
                      label="Monto"
                      InputProps={{
                        startAdornment:(
                          <InputAdornment position="start">{installmentDetails.currency}</InputAdornment>)
                      }}
                      name="amount"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.amount}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="datetime-local"
                      error={Boolean(touched.date_pmt && errors.date_pmt)}
                      fullWidth
                      disabled={status === 'PAID'}
                      required
                      type="datetime-local"
                      helperText={touched.date_pmt && errors.date_pmt }
                      label="Fecha y hora de pago"
                      name="date_pmt"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date_pmt}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.reference && errors.reference)}
                      fullWidth
                      disabled={status === 'PAID'}
                      required
                      helperText={touched.reference && errors.reference}
                      label="Referencia"
                      name="reference"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reference}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Método de pago</InputLabel>
                      <Select
                        native
                        required
                        disabled={status === 'PAID'}
                        error={Boolean(touched.method && errors.method)}
                        value={values.method}
                        onChange={handleChange}
                        label="Método de pago"
                        inputProps={{
                          name: 'method',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {methodConstants.map((e) => {
                          return (
                            <option value={e.value}>{e.label}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.method && errors.method}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Tipo de pago</InputLabel>
                      <Select
                        native
                        required
                        disabled={status === 'PAID'}
                        error={Boolean(touched.paymentType && errors.paymentType)}
                        value={values.paymentType}
                        onChange={handleChange}
                        label="Tipo de pago"
                        inputProps={{
                          name: 'paymentType',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {paymentTypeConstants.map((e) => {
                          return (
                            <option value={e.value}>{e.label}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.paymentType && errors.paymentType}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel htmlFor="outlined-age-native-simple">Cuenta</InputLabel>
                      <Select
                        native
                        required
                        disabled={status === 'PAID'}
                        error={Boolean(touched.cashAccount && errors.cashAccount)}
                        value={values.cashAccount}
                        onChange={handleChange}
                        label="Cuenta"
                        inputProps={{
                          name: 'cashAccount',
                          id: 'outlined-pf-native-simple',
                        }}
                      >
                        {cashAccountsConstants[installmentDetails.country].map((e) => {
                          return (
                            <option value={e.value}>{e.label}</option>
                          )
                        })}
                      </Select>
                      <FormHelperText>{touched.cashAccount && errors.cashAccount}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      error={Boolean(touched.comment && errors.comment)}
                      fullWidth
                      disabled={status === 'PAID'}
                      helperText={touched.comment && errors.comment}
                      label="Comentario"
                      name="comment"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.comment}
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
                      ? 'Procesando pago'
                      : info.isError
                      ? 'Error'
                      : info.isSuccess
                      ? 'Procesar nuevo pago'
                      : 'Procesar pago'
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

PaymentForm.propTypes = {
  className: PropTypes.string
};

export default PaymentForm;
