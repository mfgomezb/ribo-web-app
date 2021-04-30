import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { loanScheduleCalculator } from '../../../utils/calculator';
import { currencyFormat } from '../../../utils/numbers';
import { Box, Button, Dialog, Grid, Hidden } from '@material-ui/core';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import QuotePDF from './QuotePDF';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const columns = [
  { id: 'number', label: '#', maxWidth: 20, paddingLeft: 5, paddingRight: 5},
  { id: 'date', label: 'Fecha', },
  { id: 'installment', label: 'Cuota', format: (value) => value.toLocaleString('en-US'), align: 'right'},
  { id: 'interest', label: 'Interes', format: (value) => value.toLocaleString('en-US'), align: 'right'},
  { id: 'principal', label: 'Principal', format: (value) => value.toLocaleString('en-US'), align: 'right'},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function ScheduleTable(props) {
  const classes = useStyles();
  const [schedule, setSchedule] = React.useState([])
  const [generatePDF, setGeneratePDF] = useState(false);
  const toggle = () => setGeneratePDF(!generatePDF);

  useEffect( () => {
    async function scheduleCreator() {
      setGeneratePDF(false)
      let newSchedule = await loanScheduleCalculator(props)
      setSchedule(newSchedule)
    }
    scheduleCreator()
  }, [props])


  return (
    <>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    maxWidth: column.maxWidth,
                    paddingLeft: column.paddingLeft,
                    paddingRight: column.paddingRight
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell
                    align="left"
                    style={{
                     maxWidth: 20,
                     paddingLeft: 5,
                     paddingRight: 5
                    }}
                  >
                    {row.installmentNumber}
                  </TableCell>
                  <TableCell align="left">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(row.payment, '$')}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(row.interest, '$')}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(row.principal, '$')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {(!generatePDF) &&
      <Box mt={2}>
        <Button
          color="secondary"
          variant="contained"
          disabled={schedule.length === 1}
          onClick={toggle}
          className={classes.action}>
          Generar PDF
        </Button>
      </Box>
      }
      {(generatePDF) ?
        <Box mt={2}>
        <Grid item>
          {/*<Hidden smDown>*/}
          {/*  <Button*/}
          {/*    className={classes.action}*/}
          {/*    onClick={() => setViewPDF(true)}*/}
          {/*  >*/}
          {/*    Visualizar PDF*/}
          {/*  </Button>*/}
          {/*</Hidden>*/}
          <PDFDownloadLink
            document={<QuotePDF
              fullName={props.fullName}
              numberOfInstallments={props.numberOfInstallments}
              interestRate={props.interestRate}
              interestOnlyPeriods={props.interestOnlyPeriods}
              capital={props.capital}
              method={props.amortizationMethod}
              paymentFrequency={props.paymentFrequency}
              startDate={props.startDate}
              firstPaymentDate={props.firstPaymentDate}
              schedule={schedule}
            />}
            fileName="invoice"
            style={{ textDecoration: 'none' }}
          >
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
            >
              Descargar PDF
            </Button>
          </PDFDownloadLink>
          {/*<Dialog fullScreen open={viewPDF}>*/}
          {/*  <Box*/}
          {/*    height="100%"*/}
          {/*    display="flex"*/}
          {/*    flexDirection="column"*/}
          {/*  >*/}
          {/*    <Box*/}
          {/*      bgcolor="common.white"*/}
          {/*      p={2}*/}
          {/*    >*/}
          {/*      <Button*/}
          {/*        variant="contained"*/}
          {/*        color="secondary"*/}
          {/*        onClick={() => setViewPDF(false)}*/}
          {/*      >*/}
          {/*        <NavigateBeforeIcon />*/}
          {/*        Back*/}
          {/*      </Button>*/}
          {/*    </Box>*/}
          {/*    <Box flexGrow={1}>*/}
          {/*      <PDFViewer*/}
          {/*        width="100%"*/}
          {/*        height="100%"*/}
          {/*        style={{ border: 'none' }}*/}
          {/*      >*/}
          {/*        <QuotePDF*/}
          {/*          fullName={props.fullName}*/}
          {/*          numberOfInstallments={props.numberOfInstallments}*/}
          {/*          interestRate={props.interestRate}*/}
          {/*          interestOnlyPeriods={props.interestOnlyPeriods}*/}
          {/*          capital={props.capital-(props.capital*props.downPayment)}*/}
          {/*          method={props.amortizationMethod}*/}
          {/*          paymentFrequency={props.paymentFrequency}*/}
          {/*          startDate={props.startDate}*/}
          {/*          firstPaymentDate={props.firstPaymentDate}*/}
          {/*        />*/}
          {/*      </PDFViewer>*/}
          {/*    </Box>*/}
          {/*  </Box>*/}
          {/*</Dialog>*/}
        </Grid>
          </Box>: ''}
    </>
  );
}
