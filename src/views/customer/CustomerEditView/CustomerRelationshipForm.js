import React from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomerRelationshipForm(props) {
  return <Card className={props.classes.card}>
    <CardHeader title="Información Familiar" />
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
            error={Boolean(props.touched.civilStatus && props.errors.civilStatus)}
            fullWidth
            helperText={props.touched.civilStatus && props.errors.civilStatus}
            label="Estatus Civil"
            size="small"
            required
            name="civilStatus"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.civilStatus}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            error={Boolean(props.touched.spouseFullName && props.errors.spouseFullName)}
            fullWidth
            helperText={props.touched.spouseFullName && props.errors.spouseFullName}
            label="Nombre completo pareja"
            size="small"
            required={props.values.civilStatus != 'SINGLE'}
            name="spouseFullName"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.spouseFullName}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}>
          <TextField
            error={Boolean(props.touched.spousePlaceOfBirth && props.errors.spousePlaceOfBirth)}
            fullWidth
            helperText={props.touched.spousePlaceOfBirth && props.errors.spousePlaceOfBirth}
            label="Lugar de nacimiento"
            size="small"
            required={props.values.civilStatus != 'SINGLE'}
            name="spousePlaceOfBirth"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.spousePlaceOfBirth}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}>
          <TextField
            error={Boolean(props.touched.spouseDOB && props.errors.spouseDOB)}
            fullWidth
            type="date"
            helperText={props.touched.spouseDOB && props.errors.spouseDOB}
            label="Fecha de nacimiento"
            size="small"
            required={props.values.civilStatus != 'SINGLE'}
            name="spouseDOB"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.spouseDOB}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}>
          <TextField
            error={Boolean(props.touched.spouseNationalId && props.errors.spouseNationalId)}
            fullWidth
            helperText={props.touched.spouseNationalId && props.errors.spouseNationalId}
            label="Número de identificación"
            size="small"
            required={props.values.civilStatus != 'SINGLE'}
            name="spouseNationalId"
            onBlur={props.onBlur}
            onChange={props.onChange}
            required
            value={props.values.spouseNationalId}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}

CustomerRelationshipForm.propTypes = {
  classes: PropTypes.any,
  touched: PropTypes.any,
  errors: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.any
};

export default CustomerRelationshipForm;
