import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from './countries';

const useStyles = makeStyles(() => ({
  root: {}
}));

const defaultUserValues = (user) => {
  return {
    name: user.name || '',
    email: user.email || '',
    phone: '',
    country: '',
    state: '',
    city: ''
  };
};

const GeneralSettings = ({
  className,
  user,
  onSubmit,
  isLoading,
  submitText,
  clearOnSubmit,
  ...rest
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: user.name || '',
    email: user.email || '',
    phone: '',
    country: '',
    state: '',
    city: '',
    canHire: false,
    isPublic: false
  });

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));

  const toggleValue = (field) => {
    let newValues = values;
    newValues = { ...newValues, [field]: !newValues[field] };
    return setValues(newValues);
  };

  const handleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultUserValues);
    }
    e.preventDefault();
    onSubmit(values);
  };

  // React.useEffect(() => {
  //   setValues(initialValues);
  // }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Name"
                name="name"
                onChange={(e) => setValue('name', e.target.value)}
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Email Address"
                name="email"
                onChange={(e) => setValue('email', e.target.value)}
                required
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={(e) => setValue('phone', e.target.value)}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                getOptionLabel={(option) => option.text}
                options={countries}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={(e) => setValue('country', e.target.value)}
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="State/Region"
                name="state"
                onChange={(e) => setValue('state', e.target.value)}
                value={values.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={(e) => setValue('city', e.target.value)}
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" color="textPrimary">
                Make Contact Info Public
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Means that anyone viewing your profile will be able to see your
                contacts details
              </Typography>
              <Switch
                checked={values.isPublic}
                edge="start"
                name="isPublic"
                onChange={(e) => toggleValue('isPublic')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" color="textPrimary">
                Available to hire
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Toggling this will let your teammates know that you are
                available for acquiring new projects
              </Typography>
              <Switch
                checked={values.canHire}
                edge="start"
                name="canHire"
                onChange={(e) => toggleValue('canHire')}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button
            color="secondary"
            disabled={isLoading}
            type="submit"
            variant="contained"
          >
            {submitText}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
