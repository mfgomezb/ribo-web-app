import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import moment from 'moment'
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  InputAdornment,
  SvgIcon,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TablePagination,
  TableRow,
  TextField,
  makeStyles, Link, Button, Grid
} from '@material-ui/core';
import {
  Download as DownloadIcon,
  Search as SearchIcon
} from 'react-feather';
import {useGetCollection} from '../../../hooks/useGetCollection';
import useLocationOptions from '../../../hooks/useUserLocation';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import qs from 'qs';
import { DateTime } from 'luxon';
import { removeLoanInstallment } from '../../../actions/loans';
import LoanEditModal from '../../loans/LoanDetailsView/LoanPaymentModal';
import { useDispatch } from 'react-redux';
import {getCollectionFile} from '../../../utils/API'
import useGlobal from '../../../hooks/useGlobal';

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Ultima actualización (recientes)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Ultima actualización (antiguos)'
  },
  {
    value: 'createdAt|desc',
    label: 'Fecha de creación (recientes)'
  },
  {
    value: 'createdAt|asc',
    label: 'Fecha de creación (antiguos)'
  }
];

// const applyFilters = (products, query, filters) => {
//   return products.filter((product) => {
//     let matches = true;
//
//     if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
//       matches = false;
//     }
//
//     if (filters.category && product.category !== filters.category) {
//       matches = false;
//     }
//
//     if (filters.availability) {
//       if (filters.availability === 'available' && !product.isAvailable) {
//         matches = false;
//       }
//
//       if (filters.availability === 'unavailable' && product.isAvailable) {
//         matches = false;
//       }
//     }
//
//     if (filters.inStock && !['in_stock', 'limited'].includes(product.inventoryType)) {
//       matches = false;
//     }
//
//     if (filters.isShippable && !product.isShippable) {
//       matches = false;
//     }
//
//     return matches;
//   });
// };

const useStyles = makeStyles((theme) => ({
  root: {},
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  queryField: {
    width: 500
  },
  categoryField: {
    flexBasis: 200
  },
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  stockField: {
    marginLeft: theme.spacing(2)
  },
  shippableField: {
    marginLeft: theme.spacing(2)
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  },
  nameColumn: {
    minWidth: 150
  }
}));

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

// const percentageFormat = (number) => {
//   return numeral(number).format(`0.00%`)
// };

const Results = ({ className, ...rest }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const history = useHistory();
  const { countries } = useGlobal()
  const [page, setPage] = useState(qs.parse(search).page || 0);
  const [limit, setLimit] = useState(qs.parse(search).limit || 10);
  const [query, setQuery] = useState(qs.parse(search).query || '');
  const [minDays, setMinDays] = useState(qs.parse(search).minDays || -30);
  const [maxDays, setMaxDays] = useState(qs.parse(search).maxDays || 360);
  const [selectedDate, setSelectedDate] = React.useState(qs.parse(search).selectedDate || moment().format('YYYY-MM-DD'));
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({ country: countries[0].id, });
  const [params, setParams] = useState({ page, limit, query, filters });
  const {
    isLoading,
    data,
    // error,
  } = useGetCollection(params);
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


  React.useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        setParams({page, limit, minDays, maxDays, selectedDate, query, filters});
        history.push(pathname+ "?" + qs.stringify({
          page: page,
          limit: limit,
          query: query,
          minDays: minDays,
          maxDays: maxDays,
          selectedDate: selectedDate,
          ...filters}
        ))
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };

  }, [query, minDays, maxDays, selectedDate, filters]);

  React.useEffect(() => {
        setParams({page, limit, minDays, maxDays, selectedDate, query, filters});
        history.push(pathname+ "?" + qs.stringify({
          page: page,
          limit: limit,
          query: query,
          minDays: minDays,
          maxDays: maxDays,
          selectedDate: selectedDate,
          ...filters}
          )
        );
  }, [page, limit])

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
    setPage(0);
  };

  const handleMinDays = (event) => {
    event.persist();
    setMinDays(event.target.value);
  };

  const handleMaxDays = (event) => {
    event.persist();
    setMaxDays(event.target.value);
  };

  const handleCountryChange = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'ALL') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      country: value
    }));

  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const downloadFile = (params) => {
    return getCollectionFile(params)
  }

  return (
    <React.Fragment>
    <Box mb={2}>
      <Button
        className={classes.action}
        onClick={ (e) => downloadFile(params)}
        startIcon={
          <SvgIcon fontSize="small">
            <DownloadIcon />
          </SvgIcon>
        }
      >
        Exportar
      </Button>
    </Box>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            name="query"
            placeholder="Buscar cliente"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Ordenar por"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          mt={3}
          display="flex"
          alignItems="center"
        >
          <TextField
            className={classes.categoryField}
            label="País"
            name="country"
            onChange={handleCountryChange}
            select
            SelectProps={{ native: true }}
            value={filters.country || 'ALL'}
            variant="outlined"
          >
            {countries.map((countryOption) => (
              <option
                key={countryOption.id}
                value={countryOption.id}
              >
                {countryOption.name}
              </option>
            ))}
          </TextField>
          <KeyboardDatePicker
            className={classes.availabilityField}
            format="YYYY-MM-DD"
            id="date-picker-inline"
            label="Fecha max de próx cuota"
            value={selectedDate}
            onChange={handleDateChange}
            variant="inline"
            inputVariant="outlined"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={classes.availabilityField}
            onChange={handleMinDays}
            InputProps={{ inputProps: { min: -60 } }}
            label="Días de atraso (min)"
            type="number"
            name="minDays"
            placeholder="-30"
            value={minDays}
            variant="outlined"
            />
          <TextField
            className={classes.availabilityField}
            onChange={handleMaxDays}
            label="Días de atraso (max)"
            type="number"
            InputProps={{ inputProps: { max: 500 } }}
            name="maxDays"
            placeholder="360"
            value={maxDays}
            variant="outlined"
          />
        </Box>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ verticalAlign: 'bottom' }}>
                  Prestamo
                </TableCell>
                <TableCell style={{whiteSpace: 'nowrap', verticalAlign: 'bottom'}}>
                  Nombre
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Teléfono
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Vencimiento
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Días atrasado
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Cuota
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Cuotas vencidas
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Monto vencido
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Capital adeudado
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Intereses adeudados
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Capital
                </TableCell>
                <TableCell align="right" style={{ verticalAlign: 'bottom' }}>
                  Pago total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && data?.results.map((product) => {
                return (
                  <TableRow
                    hover
                    key={product._id}
                  >
                    <TableCell>
                      <Link
                        variant="subtitle2"
                        color="textPrimary"
                        component={RouterLink}
                        underline="none"
                        to={`/app/management/loan/${product._id}/details`}
                      >
                        {product._id.slice(product._id.length -8, product._id.length)}
                      </Link>
                    </TableCell>

                    <TableCell className={classes.nameColumn}>
                      <Link
                        variant="subtitle2"
                        color="textPrimary"
                        component={RouterLink}
                        underline="none"
                        to={`/app/management/customers/${product._borrower}`}
                      >
                        {product.fullName}
                      </Link>
                    </TableCell>
                    <TableCell >
                        {product.cellphoneNumber}
                    </TableCell >
                    <TableCell align="right">
                      {DateTime.fromISO(product.date).toFormat('DD').toString()}
                    </TableCell>
                    <TableCell align="right">
                      {parseInt(product.dayDiff)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleOpen(product.oldest_installment)}
                      >
                        {currencyFormat(product.oldest_payment, '$')}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {product.number_unpaid}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.principal_unpaid+product.interest_unpaid, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.principal_unpaid, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.interest_unpaid, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.remainingCapital, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.total_unpaid, '$')}
                    </TableCell>
                  </TableRow>)})}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={ data?.total[0]?.total || 0 }
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
      {selectedSchedule && isOpened && <LoanEditModal
        open={isOpened}
        onClose={handleClose}
        scheduleData={selectedSchedule}
      />}
    </Card>
    </React.Fragment>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;
