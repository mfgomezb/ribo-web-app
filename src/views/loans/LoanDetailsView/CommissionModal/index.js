import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {useParams} from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux';
import {fetchCommissionProfiles} from 'src/utils/API'
import { useGetLoanInstallment } from '../../../../hooks/useLoans';
import { useProcessPayment } from '../../../../hooks/usePayments';
import { handleInstallmentInitialData } from 'src/actions/loans';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import CommissionForm from 'src/views/loans/LoanDetailsView/CommissionModal/CommissionForm'
import CommissionList from './CommissionList';
import axios from '../../../../utils/axios';
import { useNewCommission } from '../../../../hooks/useCommission';

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
  onClose,
  open,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {loanId} = useParams()
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [commissionProfiles, setCommissionProfiles] = React.useState([])
  const [newCommission, newCommissionInfo] = useNewCommission()


  const getCommissionProfiles = React.useCallback(async () => {
    try {
      let profiles = []
      if (open) {
        profiles = await fetchCommissionProfiles(loanId)
      }

      if (isMountedRef.current) {
        setCommissionProfiles(profiles)
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, open]);

  React.useEffect(() => {
    getCommissionProfiles();
  }, [getCommissionProfiles]);


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
            <CommissionForm
              loan={loanId}
              commissionProfiles={commissionProfiles}
              info={newCommissionInfo}
            />
            <Box mt={2}>
              <CommissionList profiles={commissionProfiles}/>
            </Box>
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
