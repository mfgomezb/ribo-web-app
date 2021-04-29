import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { collateralTypes, currentStatus } from 'src/utils/constants';
import getInitials from '../../../utils/getInitials';
import CommissionModal from 'src/views/loans/LoanDetailsView/CommissionModal';
import CollateralModal from 'src/views/loans/LoanDetailsView/CollateralModal';
import { handleLoanCommissionsInitialData } from '../../../actions/commissions';
import { handleLoanCollateralsInitialData } from '../../../actions/collaterals';
import { currencyFormat, percentageFormat } from '../../../utils/numbers';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ConfigInfo = ({ className, loanId, ...rest }) => {
  const classes = useStyles()

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={8}
        xl={8}
        xs={12}
        >
        <Collaterals members={[]} />
      </Grid>
      <Grid
        item
        lg={4}
        xl={4}
        xs={12}
      >
        <Commissions members={[]} />
        {/*<Brief project={project} />*/}
      </Grid>
    </Grid>
  );
};

const collateralBoxStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  }
}));

const Collaterals = ({ className, ...rest }) => {
  const classes = collateralBoxStyles();
  const { loanId } = useParams()
  const dispatch = useDispatch()
  const collaterals = useSelector( state => state.collateral.collaterals)
  const [isOpened, setOpened] = useState(false);

  React.useEffect(() => {
    dispatch(handleLoanCollateralsInitialData(loanId))
  },[])

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        className={classes.header}
        title="Colaterales"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      <CardContent className={classes.content}>
        <List>
          {collaterals.map((collateral) => (
            <ListItem
              disableGutters
              key={collateral._id}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Author"
                  src={collateral?.avatar}
                >
                  {collateral?.type}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={currencyFormat(collateral?.value, '$')}
                primaryTypographyProps={{ variant: 'h6' }}
              />
              <ListItemText
                primary={percentageFormat(collateral?.loanPrincipalToValue)}
                primaryTypographyProps={{ variant: 'h6' }}
              />
              <ListItemText
                primary={collateralTypes[collateral?.type]}
                primaryTypographyProps={{ variant: 'h6' }}
              />
              <ListItemText
                primary={DateTime.fromISO(collateral?.registerDate).toFormat('DD').toString()}
                primaryTypographyProps={{ variant: 'h6' }}
              />
              <ListItemText
                primary={currentStatus[collateral?.currentStatus[0]?.status]}
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={() => handleOpen()}>
          Administrar colaterales
        </Button>
      </CardActions>
      <CollateralModal
        open={isOpened}
        onClose={ () => handleClose()}
      />
    </Card>
  );
};


const commissionBoxStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  }
}));

const Commissions = ({ className, ...rest }) => {
  const classes = commissionBoxStyles();
  const {loanId} = useParams()
  const dispatch = useDispatch()
  const commissions = useSelector( state => state.commission.commissions)
  const [isOpened, setOpened] = useState(false);

  React.useEffect(() => {
      dispatch(handleLoanCommissionsInitialData(loanId))
  },[])

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        className={classes.header}
        title="Comisiones"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      <CardContent className={classes.content}>
        <List>
          { commissions.map((member) => (
            <ListItem
              disableGutters
              key={member?._salesman}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Author"
                  // src={member.avatar}
                >
                  {getInitials(member?.fullName)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member?.fullName}
                primaryTypographyProps={{ variant: 'h6' }}
                secondary={(member?.pct * 100) + '%'}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={() => handleOpen()} fullWidth>
          Administrar comisiones
        </Button>
      </CardActions>
      <CommissionModal
        open={isOpened}
        onClose={ () => handleClose()}
      />
    </Card>
  );
};

ConfigInfo.propTypes = {
  className: PropTypes.string,
};

export default ConfigInfo;

