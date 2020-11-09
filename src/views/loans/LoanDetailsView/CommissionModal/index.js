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
import { useGetLoanInstallment } from '../../../../hooks/useLoans';
import { useProcessPayment } from '../../../../hooks/usePayments';
import { handleInstallmentInitialData } from 'src/actions/loans';

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

const CommissionModal = ({
  className,
  scheduleData,
  onClose,
  open,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const installmentDetails = useSelector((state) => state.loan.installmentDetails)
  // const [ paymentValues, setPaymentValues ] = React.useState({})
  // const [processPayment, processPaymentInfo] = useProcessPayment()

  // React.useEffect(() => {
  //   dispatch(handleInstallmentInitialData(scheduleData))
  // }, [dispatch])


  //
  // const handlePayment = async (values) => {
  //   try {
  //     setPaymentValues(values)
  //     await processPayment(values)
  //     await dispatch(handleInstallmentInitialData(scheduleData))
  //
  //     enqueueSnackbar('Pago procesado', {
  //       variant: 'success'
  //     });
  //     return true
  //   } catch (e) {
  //     enqueueSnackbar('Fallo al procesar pago', {
  //       variant: 'error'
  //     });
  //   }
  //
  // };

  // if (!installmentDetails) {
  //   return null
  // }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
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
            Administración de comisiones
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
            {/*{installmentDetails && <LoanPaymentForm onPayment={handlePayment} info={processPaymentInfo} paymentDetails={installmentDetails} />}*/}
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

CommissionModal.propTypes = {
  // card: PropTypes.object.isRequired,
  className: PropTypes.string,
  // list: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

CommissionModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default CommissionModal;
