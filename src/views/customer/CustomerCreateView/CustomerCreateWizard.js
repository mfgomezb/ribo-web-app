import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  colors,
  makeStyles,
  withStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  User as UserIcon,
  Star as StarIcon,
  Briefcase as BriefcaseIcon,
  File as FileIcon
} from 'react-feather';
import CustomerInformationForm from 'src/views/customer/CustomerCreateView/CustomerInformationForm'
import CustomerAccountTypeForm from 'src/views/customer/CustomerCreateView/CustomerAccountTypeForm'
import CustomerContactForm from 'src/views/customer/CustomerCreateView/CustomerContactForm';
import CustomerRelationshipForm from 'src/views/customer/CustomerCreateView/CustomerRelationshipForm';
import CustomerBankingForm from 'src/views/customer/CustomerCreateView/CustomerBankingForm';
import CustomerWorkForm from 'src/views/customer/CustomerCreateView/CustomerWorkForm';
import { createNewUser } from '../../../hooks/useUser';

const steps = [
  {
    label: 'Tipo de cuenta',
    icon: UserIcon
  },
  {
    label: 'General',
    icon: BriefcaseIcon
  },
  {
    label: 'Contacto',
    icon: FileIcon
  },
  {
    label: 'Familia',
    icon: FileIcon
  },
  {
    label: 'Trabajo',
    icon: FileIcon
  },
  {
    label: 'Bancos',
    icon: FileIcon
  }
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider
  }
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  avatar: {
    backgroundColor: colors.red[600]
  },
  stepper: {
    backgroundColor: 'transparent'
  }
}));

const CustomerCreateView  = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(5);
  const [newUser, setNewUser] = useState('')
  const [customerValues, setCustomerValues] = useState({})
  const [completed, setCompleted] = useState(false);

  const handleNext = (values) => {
    setCustomerValues({ ...customerValues, ...values })
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = async (values) => {
    setCustomerValues({ ...customerValues, ...values })
    let createdUser = await createNewUser({ ...customerValues, ...values})
    setNewUser(createdUser._id)
    setCompleted(true);
  };

  if (!completed) {
    return (
      <Paper>
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
          >
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              connector={<CustomStepConnector />}
              orientation="vertical"
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={CustomStepIcon}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
          >
            <Box p={3}>
              {activeStep === 0 && (
                <CustomerAccountTypeForm
                  customer={customerValues}
                  onNext={handleNext} />
              )}
              {activeStep === 1 && (
                <CustomerInformationForm
                  customer={customerValues}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
              {activeStep === 2 && (
                <CustomerContactForm
                  customer={customerValues}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
              {activeStep === 3 && (
                <CustomerRelationshipForm
                  customer={customerValues}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
              {activeStep === 4 && (
                <CustomerWorkForm
                  customer={customerValues}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
              {activeStep === 5 && (
                <CustomerBankingForm
                  customer={customerValues}
                  onBack={handleBack}
                  onComplete={handleComplete}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    )
  } else {
    return (
      <Card>
        <CardContent>
          <Box
            maxWidth={450}
            mx="auto"
          >
            <Box
              display="flex"
              justifyContent="center"
            >
              <Avatar className={classes.avatar}>
                <StarIcon />
              </Avatar>
            </Box>
            <Box mt={2}>
              <Typography
                variant="h3"
                color="textPrimary"
                align="center"
              >
                Listo!
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="center"
              >
                El cliente ha sido creado satisfactoriamente.
              </Typography>
            </Box>
            <Box
              mt={2}
              display="flex"
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to={`/app/management/customers/${newUser}`}
              >
                Ver cliente
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }
};

export default CustomerCreateView;
