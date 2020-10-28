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
  makeStyles, Grid, CardHeader, Table, TableBody, TableRow, TableCell, Typography, Card
} from '@material-ui/core';
import Page from 'src/components/Page';
// import axios from 'src/utils/axios';
import { useParams, useRouteMatch, Link, Route } from 'react-router-dom'
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useLoanDetailsView } from 'src/hooks/useLoans'
import Header from './Header';
import clsx from 'clsx';
import Overview from 'src/views/loans/LoanDetailsView/Overview'
import LoanInfo from 'src/views/loans/LoanDetailsView/LoanInfo'
import CustomerView from 'src/views/loans/LoanDetailsView/CustomerView'
// import Details from './Details';
// import Loans from './Loans';
// import CustomerView from './CustomerView'
// import Logs from './Logs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
  },
  mt: {
    marginTop: theme.spacing(1),
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const LoanDetailsView = () => {
  const classes = useStyles();
  const {loanId, loanView} = useParams()
  const {isLoading, data, error } = useLoanDetailsView(loanId)
  const [currentTab, setCurrentTab] = useState('details');
  const tabs = [
    { value: 'details', label: 'Detalles', },
    { value: 'payments', label: 'Pagos',},
    { value: 'transactions', label: 'Transacciones',},
    { value: 'investors', label: 'Inversores',},
    { value: 'config', label: 'Configuración',},
  ];

  // const data = {}
  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Ribo - Detalles préstamo"
    >
      <Container maxWidth={false}>
        <Header details={data} />
          <Grid
            className={classes.mt}
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Box>
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
                    to={`/app/management/loan/${loanId}/${tab.value}`}
                  />
                ))}
              </Tabs>
              <Divider />
            </Box>
          </Grid>
        <Grid
          className={classes.mt}
          container
          spacing={2}
        >
            <Grid
              item
              lg={3}
              md={3}
              xl={3}
              xs={12}
            >
              <LoanInfo details={data}/>
            </Grid>
            <Grid
              item
              lg={9}
              md={9}
              xl={9}
              xs={12}
            >
                <CustomerView loanId={loanId} loanView={currentTab}/>
            </Grid>
          </Grid>
      </Container>
    </Page>
  );

};

export default LoanDetailsView;
