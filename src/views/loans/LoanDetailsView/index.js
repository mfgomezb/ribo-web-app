import React, {
  useState,
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles, Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams, Link } from 'react-router-dom'
import { useLoanDetailsView } from 'src/hooks/useLoans'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header';
import LoanInfo from 'src/views/loans/LoanDetailsView/LoanInfo'
import CustomerView from 'src/views/loans/LoanDetailsView/CustomerView'
import {handleLoanInitialData} from 'src/reducers/loans'

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
  const dispatch = useDispatch()
  const loanDetails = useSelector((state) => state.loan.loanDetails)
  const {loanId, loanView} = useParams()
  const [currentTab, setCurrentTab] = useState( loanView || 'details');
  const tabs = [
    { value: 'details', label: 'Detalles', },
    { value: 'payments', label: 'Pagos',},
    { value: 'transactions', label: 'Transacciones',},
    { value: 'investors', label: 'Inversores',},
    { value: 'config', label: 'Configuración',},
  ];

  React.useEffect(() => {
    dispatch(handleLoanInitialData(loanId))
  }, [dispatch])


  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!loanDetails) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Ribo - Detalles préstamo"
    >
      <Container maxWidth={false}>
        <Header details={loanDetails} />
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
              <LoanInfo details={loanDetails}/>
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
