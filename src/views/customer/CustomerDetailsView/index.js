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
import { useParams } from 'react-router-dom'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useGetUser } from 'src/hooks/useUser'
import Header from './Header';
import Details from './Details';
import Invoices from './Invoices';
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
  const classes = useStyles();
  const {customerId} = useParams()
  const {isLoading, data, error } = useGetUser(customerId)
  const isMountedRef = useIsMountedRef();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  console.log(customerId)
  const tabs = [
    { value: 'details', label: 'Detalles' },
    { value: 'prestamos', label: 'Creditos' },
    { value: 'inversiones', label: 'Inversiones' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // const getCustomer = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/customers/1');
  //
  //     if (isMountedRef.current) {
  //       setCustomer(response.data.customer);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getCustomer();
  // }, [getCustomer]);
  //
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
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box mt={3}>
            {currentTab === 'details' && <Details customer={data} />}
            {currentTab === 'invoices' && <Invoices />}
            {currentTab === 'logs' && <Logs />}
          </Box>
      </Container>
    </Page>
  );

};

export default CustomerDetailsView;
