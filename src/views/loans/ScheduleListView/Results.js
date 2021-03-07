import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import {Pending as PendingIcon} from '@material-ui/icons'
import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import Label from 'src/components/Label';
import {useGetScheduleList} from '../../../hooks/useLoans';
import qs from 'qs';
import { useOfFunds as useOfFundsOptions } from 'src/views/loans/LoanListView/FormConstants'
import { DateTime } from 'luxon';
import useLocationOptions from '../../../hooks/useUserLocation';


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

const countryOptions = [
  {
    id: 'ALL',
    name: 'Todos'
  },
  {
    name: 'Perú',
    id: 'PERU'
  },
  {
    id: 'DOMINICAN_REPUBLIC',
    name: 'República Dominicana',
  },
  {
    name: 'USA',
    id: 'USA'
  },
  {
    name: 'Venezuela',
    id: 'VENEZUELA'
  }
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

const getInventoryLabel = (inventoryType) => {
  const map = {
    in_stock: {
      text: 'In Stock',
      color: 'success'
    },
    limited: {
      text: 'Limited',
      color: 'warning'
    },
    out_of_stock: {
      text: 'Out of Stock',
      color: 'error'
    }
  };

  const { text, color } = map[inventoryType];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyFilters = (products, query, filters) => {
  return products.filter((product) => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && product.category !== filters.category) {
      matches = false;
    }

    if (filters.availability) {
      if (filters.availability === 'available' && !product.isAvailable) {
        matches = false;
      }

      if (filters.availability === 'unavailable' && product.isAvailable) {
        matches = false;
      }
    }

    if (filters.inStock && !['in_stock', 'limited'].includes(product.inventoryType)) {
      matches = false;
    }

    if (filters.isShippable && !product.isShippable) {
      matches = false;
    }

    return matches;
  });
};

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

const currencyFormat = (number, currency) => {
  return numeral(number).format(`${currency}0,0.00`)
}

const percentageFormat = (number) => {
  return numeral(number).format(`0.00%`)
}
const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const history = useHistory()
  const { pathname, search } = useLocation()
  const countries = useLocationOptions()
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
  const {isLoading, data, error} = useGetScheduleList(params)

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

  // const handleRestructureChange = (event) => {
  //   event.persist();
  //
  //   let value = null;
  //
  //   if (event.target.checked) {
  //     value = true;
  //   }
  //
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     isRestructured: value
  //   }));
  // };


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

  // UsuALLy query is done on backend with indexing solutions
  // const filteredProducts = applyFilters(products, query, filters);

  return (
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
                let country = countryOptions.find( e =>  e.id === product.country).name
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
