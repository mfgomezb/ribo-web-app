import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Paper,
  FormHelperText,
  Typography,
  Radio,
  Button,
  makeStyles
} from '@material-ui/core';

const typeOptions = [
  {
    value: 'investor',
    title: 'Inversionista',
    description: 'Registro de nuevo inversionista'
  },
  {
    value: 'borrower',
    title: 'Prestatario',
    description: 'Registro de nuevo prestatario'
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  typeOption: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const UserDetails = ({
  className,
  customer,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const [type, setType] = useState(!customer.investor ? 'borrower' : 'investor');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (newType) => {
    setType(newType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      if (onNext) {
        onNext({ [type]: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Seleccione que tipo de cuenta desea crear
      </Typography>
      <Box mt={2}>
        {typeOptions.map((typeOption) => (
          <Paper
            className={classes.typeOption}
            elevation={type === typeOption.value ? 10 : 1}
            key={typeOption.value}
          >
            <Radio
              checked={type === typeOption.value}
              onClick={() => handleChange(typeOption.value)}
            />
            <Box ml={2}>
              <Typography
                gutterBottom
                variant="h5"
                color="textPrimary"
              >
                {typeOption.title}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {typeOption.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      {error && (
        <Box mt={2}>
          <FormHelperText error>
            {error}
          </FormHelperText>
        </Box>
      )}
      <Box
        mt={6}
        display="flex"
      >
        {onBack && (
          <Button
            onClick={onBack}
            size="large"
          >
            Previous
          </Button>
        )}
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

UserDetails.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default UserDetails;
