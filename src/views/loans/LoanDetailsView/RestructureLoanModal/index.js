import React from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, Grid, IconButton, makeStyles, SvgIcon, Typography } from '@material-ui/core';
import { XCircle as CloseIcon } from 'react-feather';
import LoanRefactorForm from './LoanRefactorForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
  onClose,
  open,
  capitalToRestructure,
  ...rest
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
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
  //     await dispatch(handleLoanInitialData(installmentDetails._loan))
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
  //
  // if (!installmentDetails) {
  //   return null
  // }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="lg"
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
              Restructurar préstamo
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
              <LoanRefactorForm isRestructure={true} capitalToRestructure={capitalToRestructure}/>
            </Grid>
          </Grid>
        </div>
    </Dialog>
  );
};

PaymentModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

PaymentModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default PaymentModal;
