import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import qs from 'qs';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  Link,
  makeStyles,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { useGetUsers } from '../../../hooks/useUser';

const tabs = [
  {
    value: 'all',
    label: 'Todos'
  },
  {
    value: 'investor',
    label: 'Inversor'
  },
  {
    value: 'borrower',
    label: 'Prestatario'
  },
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];


const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
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
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

const Results = ({
  className,
  customers,
  ...rest
}) => {
  const classes = useStyles();
  const { pathname, search } = useLocation()
  const history = useHistory()
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(qs.parse(search).page || 1);
  const [limit, setLimit] = useState(qs.parse(search).limit || 10);
  const [query, setQuery] = useState(qs.parse(search).query || '');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    investor: true,
    borrower: true,
  });
  const [params, setParams] = useState({ page, limit, query, filters })
  const {isLoading, data } = useGetUsers(params)

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      investor: true,
      borrower: true,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  React.useEffect(() => {
    setParams({page, limit, query, filters})
    history.push(pathname+ "?" + qs.stringify({page: page, limit: limit, query: query, filter: filters }))
  }, [page, limit, query, filters])

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer._id)
      : []);
  };


  const handlePageChange = (event) => {
    setPage(page + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  let enableBulkOperations = []
  let selectedSomeCustomers = []
  let selectedAllCustomers = []

  if (!isLoading && data.docs) {
    enableBulkOperations = selectedCustomers.length > 0;
    selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
    selectedAllCustomers = selectedCustomers.length === data.docs;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        p={2}
        minHeight={56}
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
          placeholder="Search customers"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Sort By"
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
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  e-mail
                </TableCell>
                <TableCell>
                  Direcci??n
                </TableCell>
                <TableCell>
                  Tel??fono
                </TableCell>
                <TableCell>
                  Empresa
                </TableCell>
                <TableCell align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && data.docs.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(customer._id);
                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isCustomerSelected}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          // src={customer.avatar}
                        >
                          {getInitials(customer.fullName)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/app/management/customers/${customer._id}`}
                            variant="h6"
                          >
                            {customer.firstName + " " + customer.lastName}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {customer.investor || customer.borrower ? `${customer.borrower ? 'prestario': ''} ${customer.investor ? 'inversor':''}` : ""}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.country || customer.location}
                    </TableCell>
                    <TableCell>
                      {customer.cellphoneNumber}
                    </TableCell>
                    <TableCell>
                      {customer.businessName}
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={!isLoading && data.totalDocs}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;
