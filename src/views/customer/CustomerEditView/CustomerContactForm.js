import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function CustomerContactForm(props) {
  return <Card className={props.classes.card}>
    <CardHeader title="Información de contacto" />
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
            error={Boolean(props.touched.email && props.errors.email)}
            fullWidth
            helperText={props.touched.email && props.errors.email}
            label="Email address"
            size="small"
            name="email"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.email}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.cellphoneNumber && props.errors.cellphoneNumber)}
            fullWidth
            helperText={props.touched.cellphoneNumber && props.errors.cellphoneNumber}
            label="Número de teléfono"
            size="small"
            name="cellphoneNumber"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.cellphoneNumber}
            variant="outlined"
          />
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.country && props.errors.country)}
            fullWidth
            helperText={props.touched.country && props.errors.country}
            label="País"
            size="small"
            required
            name="country"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.country}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.city && props.errors.city)}
            fullWidth
            helperText={props.touched.city && props.errors.city}
            label="Ciudad/Estado"
            size="small"
            name="city"
            required
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.city}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.address && props.errors.address)}
            fullWidth
            helperText={props.touched.address && props.errors.address}
            label="Dirección"
            size="small"
            name="address"
            required
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.address}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.residenceName && props.errors.residenceName)}
            fullWidth
            helperText={props.touched.residenceName && props.errors.residenceName}
            label="Nombre de Residencia"
            size="small"
            name="residenceName"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.residenceName}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.residenceNumber && props.errors.residenceNumber)}
            fullWidth
            helperText={props.touched.residenceNumber && props.errors.residenceNumber}
            label="Número de Casa/Apto"
            size="small"
            name="residenceNumber"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.residenceNumber}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.contactName && props.errors.contactName)}
            fullWidth
            helperText={props.touched.contactName && props.errors.contactName}
            label="Persona de referencia"
            size="small"
            required
            name="contactName"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.contactName}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.contactCellphoneNumber && props.errors.contactCellphoneNumber)}
            fullWidth
            helperText={props.touched.contactCellphoneNumber && props.errors.contactCellphoneNumber}
            label="Teléfono de referencia"
            size="small"
            required
            name="contactCellphoneNumber"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.contactCellphoneNumber}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.contactRelationship && props.errors.contactRelationship)}
            fullWidth
            helperText={props.touched.contactRelationship && props.errors.contactRelationship}
            label="Relación con referencia"
            size="small"
            required
            name="contactRelationship"
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.values.contactRelationship}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}

CustomerContactForm.propTypes = {
  classes: PropTypes.any,
  touched: PropTypes.any,
  errors: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.any
};

export default CustomerContactForm
