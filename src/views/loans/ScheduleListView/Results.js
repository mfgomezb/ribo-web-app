import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { currencyFormat } from '../../../utils/numbers';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@material-ui/core';
import {
  ArrowRight as ArrowRightIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Search as SearchIcon
} from 'react-feather';
import Label from 'src/components/Label';
import { useGetScheduleList } from '../../../hooks/useLoans';
import qs from 'qs';
import { useOfFunds as useOfFundsOptions } from 'src/views/loans/LoanListView/FormConstants';
import { DateTime } from 'luxon';
import { getLoansScheduleFile } from '../../../utils/API';
import useGlobal from '../../../hooks/useGlobal';


const getStatusLabel = (status) => {

  const map = {
    OVERDUE: {
      text: 'VENCIDO',
      color: 'error'
    },
    PENDING: {
      text: 'PENDIENTE',
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


const categoryOptions = [
  {
    id: 'ALL',
    name: 'Todos'
  },
  {
    id: 'PENDING',
    name: 'Pendiente'
  },
  {
    id: 'GRACE',
    name: 'Gracia'
  },
  {
    id: 'OVERDUE',
    name: 'Vencido'
  },
];


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




const applyPagination = (products, page, limit) => {
    return products.slice(page * limit, page * limit + limit);
};

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
  }
}));

const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const history = useHistory()
  const { pathname, search } = useLocation()
  const { countries } = useGlobal()
  const [page, setPage] = useState(qs.parse(search).page || 0);
  const [limit, setLimit] = useState(qs.parse(search).limit || 10);
  const [query, setQuery] = useState(qs.parse(search).query || '');
  const [sort, setSort] = useState(sortOptions[0].value)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [filters, setFilters] = useState({
    country: countries[0].id,
    status: null,
    useOfFunds: null,
    // isRestructured: false,
  });
  const [params, setParams] = useState({ page, limit, query, filters })
  const {isLoading, data } = useGetScheduleList(params)

  React.useEffect(() => {
    setParams({page, limit, query, filters})
    history.push(pathname+ "?" + qs.stringify({page: page, limit: limit, query: query, ...filters}))
  }, [page, limit, query, filters])

  React.useEffect(() => {
    if (data) {
      let paginated = applyPagination(data.results, page, limit)
      setPaginatedProducts(paginated);
    }
  }, [data])



  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== 'ALL') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
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

  const handleUseOfFundsChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== 'ALL') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      useOfFunds: value
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
    return getLoansScheduleFile(params)
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
            placeholder="Search products"
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
            label="Estatus"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || 'ALL'}
            variant="outlined"
          >
            {categoryOptions.map((categoryOption) => (
              <option
                key={categoryOption.id}
                value={categoryOption.id}
              >
                {categoryOption.name}
              </option>
            ))}
          </TextField>
          <TextField
            className={classes.availabilityField}
            label="País"
            name="country"
            onChange={handleCountryChange}
            select
            SelectProps={{ native: true }}
            value={filters.country || countries[0].id}
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
          <TextField
            className={classes.availabilityField}
            label="Uso de los fondos"
            name="useOfFunds"
            onChange={handleUseOfFundsChange}
            select
            SelectProps={{ native: true }}
            value={filters.useOfFunds || 'ALL'}
            variant="outlined"
          >
            {useOfFundsOptions.map((option, index) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
          {/*<FormControlLabel*/}
          {/*  className={classes.stockField}*/}
          {/*  control={(*/}
          {/*    <Checkbox*/}
          {/*      checked={!!filters.isRestructured}*/}
          {/*      onChange={handleRestructureChange}*/}
          {/*      name="isRestructured"*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  label="Restructurado"*/}
          {/*/>*/}
        </Box>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Prestamo
                </TableCell>
                <TableCell>
                  Cuota
                </TableCell>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Estatus
                </TableCell>
                <TableCell>
                  Días
                </TableCell>
                <TableCell align="right">
                  Cuota
                </TableCell>
                <TableCell align="right">
                  Balance
                </TableCell>
                <TableCell align="right">
                  Divisa
                </TableCell>
                <TableCell align="right">
                  Pais
                </TableCell>
                <TableCell align="right">
                  Acción
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && data?.results.map((product) => {
                // let UFO = useOfFundsOptions.find( e =>  e.value === product.useOfFunds[0]).label
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
                        {product._loan.slice(product._loan.length -8, product._loan.length)}
                      </Link>
                    </TableCell>
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
                    <TableCell>
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
                    <TableCell>
                      {DateTime.fromISO(product.date).toFormat('DD').toString()}
                    </TableCell>
                    <TableCell>
                      {getStatusLabel(product.status)}
                    </TableCell>
                    <TableCell>
                      {product.dayDifference}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.interest+product.principal, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(product.balance, '$')}
                    </TableCell>
                    <TableCell align="right">
                      {product.currency}
                    </TableCell>
                    <TableCell align="right">
                      {product.country}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data?.total[0]?.total || 0 }
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
    </React.Fragment>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired
};

Results.defaultProps = {
  products: []
};

export default Results;
