import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function CustomerWorkForm(props) {
  return <Card className={props.classes.card}>
    <CardHeader title="Información Laboral" />
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
            error={Boolean(props.touched.employmentStatus && props.errors.employmentStatus)}
            fullWidth
            size="small"
            helperText={props.touched.employmentStatus && props.errors.employmentStatus}
            label="Estatus Laboral"
            name="employmentStatus"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.employmentStatus}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.monthlyIncome && props.errors.monthlyIncome)}
            fullWidth
            helperText={props.touched.monthlyIncome && props.errors.monthlyIncome}
            label="Ingreso mensual (USD)"
            name="monthlyIncome"
            size="small"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.monthlyIncome}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.businessName && props.errors.businessName)}
            fullWidth
            helperText={props.touched.businessName && props.errors.businessName}
            label="Empresa"
            name="businessName"
            size="small"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.businessName}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.businessAddress && props.errors.businessAddress)}
            fullWidth
            helperText={props.touched.businessAddress && props.errors.businessAddress}
            label="Dirección de la empresa"
            name="businessAddress"
            size="small"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.businessAddress}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.businessPosition && props.errors.businessPosition)}
            fullWidth
            helperText={props.touched.businessPosition && props.errors.businessPosition}
            label="Cargo"
            name="businessPosition"
            size="small"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.businessPosition}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.startDate && props.errors.startDate)}
            fullWidth
            helperText={props.touched.startDate && props.errors.startDate}
            label="Fecha de inicio"
            type="date"
            name="startDate"
            size="small"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.startDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}

CustomerWorkForm.propTypes = {
  classes: PropTypes.any,
  touched: PropTypes.any,
  errors: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.any
};

export default CustomerWorkForm
