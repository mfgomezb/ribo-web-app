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
import NewCommissionModal from 'src/views/loans/LoanDetailsView/CommissionModal'
import GenericMoreButton from 'src/components/GenericMoreButton';
import LoanEditModal from 'src/views/loans/LoanDetailsView/LoanPaymentModal';
import Brief from '../../project/ProjectDetailsView/Overview/Brief';
import Files from '../../project/ProjectDetailsView/Overview/Files';
import Metadata from '../../project/ProjectDetailsView/Overview/Metadata';
// import Members from '../../project/ProjectDetailsView/Overview/Members';
import getInitials from '../../../utils/getInitials';
import CommissionModal from 'src/views/loans/LoanDetailsView/CommissionModal'


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
  const dispatch = useDispatch()
  const loanSchedule = useSelector((state) => state.loan.loanSchedule)
  const [isOpened, setOpened] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const handleOpen = (e) => {
    setSelectedSchedule(e)
  }

  const handleClose = () => {
    setSelectedSchedule(null)
    dispatch(removeLoanInstallment())
  };

  React.useEffect(() => {
    if (selectedSchedule) {
      setOpened(true)
    }
  }, [selectedSchedule])


  if (!loanSchedule) {
    return null
  }


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
        <Box mt={3}>
          <Commissions members={[]} />
        </Box>
        {/*<Box mb={3}>*/}
        {/*  <Metadata project={project} />*/}
        {/*</Box>*/}

      </Grid>
    </Grid>
  );
};

const Collaterals = ({ className, members, ...rest }) => {
  const classes = useStyles();

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
          {members.map((member) => (
            <ListItem
              disableGutters
              key={member.id}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Author"
                  src={member.avatar}
                >
                  {getInitials(member.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                primaryTypographyProps={{ variant: 'h6' }}
                secondary={member.bio}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button>
          Administrar colaterales
        </Button>
      </CardActions>
    </Card>
  );
};

const Commissions = ({ className, members, ...rest }) => {
  const classes = useStyles();
  const [isOpened, setOpened] = useState(false);

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
        {/*<List>*/}
        {/*  {members.map((member) => (*/}
        {/*    <ListItem*/}
        {/*      disableGutters*/}
        {/*      key={member.id}*/}
        {/*    >*/}
        {/*      <ListItemAvatar>*/}
        {/*        <Avatar*/}
        {/*          alt="Author"*/}
        {/*          src={member.avatar}*/}
        {/*        >*/}
        {/*          {getInitials(member.name)}*/}
        {/*        </Avatar>*/}
        {/*      </ListItemAvatar>*/}
        {/*      <ListItemText*/}
        {/*        primary={member.name}*/}
        {/*        primaryTypographyProps={{ variant: 'h6' }}*/}
        {/*        secondary={member.bio}*/}
        {/*      />*/}
        {/*    </ListItem>*/}
        {/*  ))}*/}
        {/*</List>*/}
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={handleOpen} fullWidth>
          Administrar comisiones
        </Button>
      </CardActions>
      <CommissionModal
        open={isOpened}
        onClose={handleClose}
      />
    </Card>
  );
};

ConfigInfo.propTypes = {
  className: PropTypes.string,
  // orders: PropTypes.array.isRequired
};

ConfigInfo.defaultProps = {
  orders: []
};

export default ConfigInfo;

