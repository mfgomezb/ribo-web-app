import React, { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Link,
  Button, Grid, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import { useSelector, useDispatch } from 'react-redux'
import {removeLoanInstallment} from 'src/actions/loans';
import Label from 'src/components/Label';
import { currentStatus, collateralTypes } from 'src/utils/constants'
import getInitials from '../../../utils/getInitials';
import CommissionModal from 'src/views/loans/LoanDetailsView/CommissionModal'
import CollateralModal from 'src/views/loans/LoanDetailsView/CollateralModal'
import { handleLoanCommissionsInitialData } from '../../../actions/commissions';
import { handleLoanCollateralsInitialData } from '../../../actions/collaterals';


const percentageFormat = (number) => {
  return numeral(number).format(`0.00%`)
}

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const scheduleStatus = dayDiff => {
  if (dayDiff >= 0) {
    return 'PENDING'
  } else if (dayDiff < 0 && dayDiff >= -5) {
    return 'GRACE'
  } else {
    return 'OVERDUE'
  }
}
const getStatusLabel = (status) => {
  // let status = scheduleStatus(dayDiff)

  const map = {
    PAID: {
      text: 'PAGO',
      color: 'success'
    },
    PAID_LATE: {
      text: 'PAGO TARDE',
      color: 'warning'
    },
    OVERDUE: {
      text: 'VENCIDO',
      color: 'error'
    },
    PENDING: {
      text: 'PENDIENTE',
      color: 'primary'
    },
    GRACE: {
      text: 'GRACIA',
      color: 'warning'
    },
  };

  const { text, color } = map[status];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const getDaysBehind = (date, startDate = DateTime.local().toString()) => {
  let end = DateTime.fromISO(date);
  let start = DateTime.fromISO(startDate)  ;
  return Math.round(end.diff(start, 'days').days);
}

const isPaymentFulfilled = (data) => {
  let {interest, interest_pmt, principal, principal_pmt} = data
  let installment = interest + principal
  let installmentPayment = interest_pmt + principal_pmt
  return installmentPayment >= installment*0.99
}

const isPastDate = daysBehind => {
  return daysBehind <= 0;
}

const statusSetter = (data) => {
  let isDue = isPastDate(getDaysBehind(data.date))
  let isFulfilled = isPaymentFulfilled(data)
  if (isDue && isFulfilled) {
    let paymentDate = data.lastPayment || data.date_pmt
    let days = getDaysBehind(data.date, paymentDate)
    let isPaidLate = isPastDate(days+1)
    if (isPaidLate) {
      return 'PAID_LATE'
    }
    return 'PAID'
  } else if (isDue && !isFulfilled) {
    return 'OVERDUE'
  } else if (!isDue && isFulfilled){
    return 'PAID'
  } else {
    return 'PENDING'
  }
}

const applyPagination = (data, page, limit) => {
  return (data) ? data.slice(page * limit, page * limit + limit) : []
};

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

