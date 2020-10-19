import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import { useParams, useRouteMatch, Link, Route } from 'react-router-dom'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useGetUser } from 'src/hooks/useUser'
import Header from './Header';
import Details from './Details';
import Loans from './Loans';
import CustomerView from './CustomerView'
import Logs from './Logs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerDetailsView = () => {
  const {url, path} = useRouteMatch()
  const classes = useStyles();
  const {customerId, customerView} = useParams()
  const {isLoading, data, error } = useGetUser(customerId)
  const [currentTab, setCurrentTab] = useState(customerView);
  const tabs = [
    { value: 'details', label: 'Detalles', },
    { value: 'loans', label: 'Creditos',},
    { value: 'investments', label: 'Inversiones',}
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer Details"
    >
      <Container maxWidth={false}>
        <Header customer={data} />
          <Box mt={3}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={currentTab}
              variant="scrollable"
              textColor="secondary"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  component={Link}
                  value={tab.value}
                  to={`/app/management/customers/${customerId}/${tab.value}`}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box mt={3}>
                <CustomerView customer={data} customerView={customerView || 'details'}/>
          </Box>
      </Container>
    </Page>
  );

};

export default CustomerDetailsView;
