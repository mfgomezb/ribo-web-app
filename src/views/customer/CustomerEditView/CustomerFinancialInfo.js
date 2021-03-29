import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function CustomerFinancialInfo(props) {
  return <Card className={props.classes.card}>
    <CardHeader title="Información Financiera y Operativa" />
    <Divider />
    <CardContent>
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
            error={Boolean(props.touched.bank && props.errors.bank)}
            fullWidth
            helperText={props.touched.bank && props.errors.bank}
            label="Banco"
            size="small"
            name="bank"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.bank}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.accountNumber && props.errors.accountNumber)}
            fullWidth
            helperText={props.touched.accountNumber && props.errors.accountNumber}
            label="Cuenta bancaria"
            size="small"
            name="accountNumber"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.accountNumber}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.location && props.errors.location)}
            fullWidth
            helperText={(props.touched.location && props.errors.location) || 'Pais para identificar la región del inversor'}
            label="Pais"
            size="small"
            name="location"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.location}
            variant="outlined"
          />
        </Grid>
        <Grid item />
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Perfil de Inversor
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Esto activara el perfil de inversor, una vez activado no se puede desactivar.
          </Typography>
          <Switch
            checked={props.values.investor}
            color="secondary"
            edge="start"
            disabled={props.values.borrower}
            name="investor"
            onChange={props.onChange}
            value={props.values.investor}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Perfil de Prestatario
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Esto activará el perfil de prestatario, una vez activado no se puede desactivar.
          </Typography>
          <Switch
            checked={props.values.borrower}
            color="secondary"
            disabled={props.values.borrower}
            edge="start"
            name="borrower"
            onChange={props.onChange}
            value={props.values.borrower}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={props.disabled}
        >
          Actualizar cliente
        </Button>
      </Box>
    </CardContent>
  </Card>;
}

CustomerFinancialInfo.propTypes = {
  classes: PropTypes.any,
  touched: PropTypes.any,
  errors: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.any,
  disabled: PropTypes.bool
};

export default CustomerFinancialInfo
