import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { loanScheduleCalculator } from '../../../utils/calculator'
import { currencyFormat } from '../../../utils/numbers'

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [schedule, setSchedule] = React.useState([])

  useEffect( () => {
    async function scheduleCreator() {
      let newSchedule = await loanScheduleCalculator(props)
      // console.log(newSchedule)
      setSchedule(newSchedule)
    }
    scheduleCreator()


  }, [props])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                  <TableCell align="left"
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
  );
}
