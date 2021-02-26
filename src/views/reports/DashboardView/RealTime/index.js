import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import { useGetTodayStatus } from '../../../../hooks/useDashboard';

const useStyles = makeStyles((theme) => ({
  root: {},
  current: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
}));


const RealTime = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const queryPayments = useGetTodayStatus(country);
  // const isMountedRef = useIsMountedRef();

  const labels = queryPayments.data !== undefined ? queryPayments.data.disbursed.sort((a, b) =>  new Date(a.date) - new Date(b.date)).map((value, i) => value.date) : [];
  const data = queryPayments.data !== undefined ? queryPayments.data.disbursed.sort((a, b) =>  new Date(a.date) - new Date(b.date)).map((value, i) => value.monto) : [];
  const totalAmount = queryPayments.data !== undefined ? queryPayments.data.disbursed.reduce((acc, e) =>  {return acc + e.monto}, 0) : 0;


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Typography
            color="inherit"
            variant="h3"
          >
            {totalAmount}
          </Typography>
        )}
        classes={{ action: classes.current }}
        subheader="Préstamos desembolsados"
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Préstamos"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      <Box height={350}>
      <List >
        {queryPayments.data !== undefined && queryPayments.data.disbursedDetails.map((loan) => (
          <ListItem
            divider
            key={loan._id}
          >
            <ListItemText
              primary={loan.fullname}
              primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
            />
            <Typography color="inherit">
              {loan.capital}
            </Typography>
          </ListItem>
        ))}
      </List>
      </Box>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="#"
          endIcon={<NavigateNextIcon />}
        >
          Ver todos
        </Button>
      </Box>
    </Card>
  );
};

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
