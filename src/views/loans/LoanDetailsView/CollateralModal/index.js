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
import { useGetLoanInstallment } from '../../../../hooks/useLoans';
import { useProcessPayment } from '../../../../hooks/usePayments';
import { handleInstallmentInitialData } from 'src/actions/loans';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import CollateralForm from 'src/views/loans/LoanDetailsView/CollateralModal/CollateralForm'
import CollateralList from './CollateralList';
import axios from '../../../../utils/axios';
import { useNewCollateral } from '../../../../hooks/useCollateral';

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

const CollateralModal = ({
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
  // const [commissionProfiles, setCollateralProfiles] = React.useState([])



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
            Administración de colaterales
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
            <CollateralForm
              loan={loanId}
              info={{}}
            />
            <Box mt={2}>
              {/*<CollateralList profiles={commissionProfiles}/>*/}
            </Box>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

CollateralModal.propTypes = {
  // card: PropTypes.object.isRequired,
  className: PropTypes.string,
  // list: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

CollateralModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default CollateralModal;
