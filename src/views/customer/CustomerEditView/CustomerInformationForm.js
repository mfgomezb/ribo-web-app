import { Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';



function GeneralInformation(props) {

  return (
    <Card>
      <CardHeader title="Información General" />
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
              error={Boolean(props.touched.firstName && props.errors.firstName)}
              fullWidth
              helperText={props.touched.firstName && props.errors.firstName}
              label="Nombres"
              size="small"
              name="firstName"
              onBlur={props.onBlur}
              onChange={props.onChange}
              required
              value={props.values.firstName}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.lastName && props.errors.lastName)}
              fullWidth
              helperText={props.touched.lastName && props.errors.lastName}
              label="Apellidos"
              size="small"
              name="lastName"
              onBlur={props.onBlur}
              onChange={props.onChange}
              required
              value={props.values.lastName}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.gender && props.errors.gender)}
              fullWidth
              helperText={props.touched.gender && props.errors.gender}
              label="Genero"
              size="small"
              name="gender"
              onBlur={props.onBlur}
              onChange={props.onChange}
              required
              value={props.values.gender}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}>
            <TextField
              error={Boolean(props.touched.placeOfBirth && props.errors.placeOfBirth)}
              fullWidth
              helperText={props.touched.placeOfBirth && props.errors.placeOfBirth}
              label="Lugar de nacimiento"
              size="small"
              name="placeOfBirth"
              onBlur={props.onBlur}
              onChange={props.onChange}
              required
              value={props.values.placeOfBirth}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.DOB && props.errors.DOB)}
              fullWidth
              helperText={props.touched.DOB && props.errors.DOB}
              label="Fecha de nacimiento"
              size="small"
              type="date"
              name="DOB"
              onBlur={props.onBlur}
              onChange={props.onChange}
              required
              value={props.values.DOB}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.nationalId && props.errors.nationalId)}
              fullWidth
              helperText={props.touched.nationalId && props.errors.nationalId}
              label="Número de Documento"
              size="small"
              name="nationalId"
              onBlur={props.onBlur}
              onChange={props.onChange}
              value={props.values.nationalId}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.nationalIdType && props.errors.nationalIdType)}
              fullWidth
              helperText={props.touched.nationalIdType && props.errors.nationalIdType}
              label="Tipo de Documento"
              size="small"
              name="nationalIdType"
              onBlur={props.onBlur}
              onChange={props.onChange}
              value={props.values.nationalIdType}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(props.touched.nationality && props.errors.nationality)}
              fullWidth
              helperText={props.touched.nationality && props.errors.nationality}
              label="Nacionalidad"
              size="small"
              name="nationality"
              onBlur={props.onBlur}
              onChange={props.onChange}
              value={props.values.nationality}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>);
}

GeneralInformation.propTypes = {
  touched: PropTypes.any,
  errors: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.any
};

export default GeneralInformation;
