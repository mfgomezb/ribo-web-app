import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Box,
  Dialog,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  SvgIcon
} from '@material-ui/core';
import {
  XCircle as CloseIcon,
} from 'react-feather';
import Payments from './Payments';
import { useDispatch, useSelector } from 'react-redux';
import LoanPaymentForm from 'src/views/loans/LoanDetailsView/LoanPaymentModal/LoanPaymentForm'
import { useProcessPayment } from '../../../../hooks/usePayments';
import { handleInstallmentInitialData, handleLoanInitialData } from 'src/actions/loans';

const useStyles = makeStyles((theme) => ({
  root: {

    padding: theme.spacing(3)
  },
  listName: {
    fontWeight: theme.typography.fontWeightMedium
  },
  checklist: {
    '& + &': {
      marginTop: theme.spacing(3)
    }
  }
}));

const PaymentModal = ({
  className,
  onClose,
  scheduleData,
  open,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const installmentDetails = useSelector((state) => state.loan.installmentDetails)
  const [ paymentValues, setPaymentValues ] = React.useState({})
  const [processPayment, processPaymentInfo] = useProcessPayment()

  React.useEffect(() => {
    dispatch(handleInstallmentInitialData(scheduleData))
  }, [dispatch])

  const handlePayment = async (values) => {
    try {
      setPaymentValues(values)
      await processPayment(values)
      await dispatch(handleInstallmentInitialData(scheduleData))
      await dispatch(handleLoanInitialData(installmentDetails._loan))

      enqueueSnackbar('Pago procesado', {
        variant: 'success'
      });
      return true
    } catch (e) {
      enqueueSnackbar('Fallo al procesar pago', {
        variant: 'error'
      });
    }

  };

  if (!installmentDetails) {
    return null
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      fullWidth
      {...rest}
    >
      <div className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Procesar pago
          </Typography>
          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            xs={12}
            sm={12}
          >
            {installmentDetails && <LoanPaymentForm onPayment={handlePayment} info={processPaymentInfo} paymentDetails={installmentDetails} />}
          <Box mt={3} mb={4}>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Pagos recibidos por esta cuota
              </Typography>
            </Box>
            { installmentDetails && <Payments installmentPayments={installmentDetails.payments} />}
          </Box>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

PaymentModal.propTypes = {
  // card: PropTypes.object.isRequired,
  className: PropTypes.string,
  // list: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

PaymentModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default PaymentModal;
