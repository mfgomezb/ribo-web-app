import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import CloudDownload from '@material-ui/icons/CloudDownloadOutlined';
import Label from 'src/components/Label';
import numeral from 'numeral';
import { DateTime } from 'luxon';
import { deleteLoan } from '../../../utils/API'
import RestructureModal from './RestructureLoanModal';
import { removeLoanInstallment } from '../../../actions/loans';

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const percentageFormat = (number) => {
  return numeral(number).format(`0.00%`)
}

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const getDaysBehind = (date, startDate = DateTime.local().toString()) => {
  let end = DateTime.fromISO(date);
  let start = DateTime.fromISO(startDate);
  return Math.round(end.diff(start, 'days').days) || -1;
}

const scheduleStatus = dayDiff => {
  if (dayDiff >= 0 || dayDiff == undefined) {
    return 'UP_TO_DATE'
  } else if (dayDiff < 0 && dayDiff >= -5) {
    return 'GRACE'
  } else {
    return 'OVERDUE'
  }
}

const getStatusLabel = (date) => {
  let days = getDaysBehind(date)
  let status = scheduleStatus(days)

  const map = {
    OVERDUE: {
      text: `VENCIDO, ${-1*days} día(s)`,
      color: 'error'
    },
    UP_TO_DATE: {
      text: 'AL DIA',
      color: 'success'
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


const BorrowerInfo = ({
  details,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { loanId } = useParams()
  const history = useHistory();
  const [isOpened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true)
  }

  const handleClose = () => {
    setOpened(false)
  }


  const onDelete = async () => {
    try {
      let deletedLoan = await deleteLoan(loanId)
      console.log(deletedLoan)
      history.push(`/app/management/customers/${deletedLoan._borrower._id}`);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Información del prestamo" />
      <Divider />
      <Table >
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Estatus
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {getStatusLabel(details?.minDateOverdue)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Monto vencido
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(details?.overduePrincipal + details?.overdueInterest, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Capital
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(details?.capital, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Repagado
            </TableCell>
            <TableCell align="right">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(details?.capital-details?.unpaidPrincipal, '$')}
              </Typography>
                </Box>
              <Label
                className={classes.label}
                color="neutral"
              >
                {percentageFormat(1-(details?.unpaidPrincipal / details?.capital))}
              </Label>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Balance de capital
            </TableCell>
            <TableCell align="right">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {currencyFormat(details?.unpaidPrincipal, '$')}
                  </Typography>
                </Box>
                  <Label
                    className={classes.label}
                    color="neutral"
                  >
                    {percentageFormat((details?.unpaidPrincipal / details?.capital))}
                  </Label>
              </Box>
            </TableCell>
          </TableRow>

          {/*<TableRow>*/}
          {/*  <TableCell className={classes.fontWeightMedium}>*/}
          {/*    Proximos vencimientos*/}
          {/*  </TableCell>*/}
          {/*  <TableCell align="right">*/}
          {/*    <Typography*/}
          {/*      variant="body2"*/}
          {/*      color="textSecondary"*/}
          {/*    >*/}
          {/*      6000*/}
          {/*    </Typography>*/}
          {/*  </TableCell>*/}
          {/*</TableRow>*/}
          {/*<TableRow>*/}
          {/*  <TableCell className={classes.fontWeightMedium}>*/}
          {/*    Intereses Projectados*/}
          {/*  </TableCell>*/}
          {/*  <TableCell align="right">*/}
          {/*    <Typography*/}
          {/*      variant="body2"*/}
          {/*      color="textSecondary"*/}
          {/*    >*/}
          {/*      20000*/}
          {/*    </Typography>*/}
          {/*  </TableCell>*/}
          {/*</TableRow>*/}
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Intereses generados
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(details?.interest, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Ingreso Ribo
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {currencyFormat(details?.managementInterestIncome+details?.managementFeeIncome, '$')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Mora
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {percentageFormat(details?.lateFeeRate/100)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Tasa de intereses
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {percentageFormat(details?.interestRate/100)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Cuotas por pagar
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {details?.installmentsRemaining}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Card/>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button startIcon={<CloudDownload />}>
          Descargar
        </Button>
        <Button
          onClick={() => handleOpen()}
          startIcon={<BuildIcon />}
          >
          Reestructurar
        </Button>
        <Button
          onClick={() => onDelete()}
          startIcon={<DeleteIcon />}>
          Eliminar
        </Button>
      </Box>
      {isOpened && <RestructureModal
        open={isOpened}
        onClose={handleClose}
        capitalToRestructure={details?.unpaidPrincipal}
      />}
    </Card>
  );
};

BorrowerInfo.propTypes = {
  className: PropTypes.string,
  // customer: PropTypes.object.isRequired
};

export default BorrowerInfo;
