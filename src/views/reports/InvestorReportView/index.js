import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CashOnHand from './CashOnHand';
import PaymentsReceivedList from './PaymentsReceivedList';
import PaymentsOverTimeCumulative from './PaymentsOverTimeCumulative';
import PaymentsOverTime from './PaymentsOverTime';
import LoanDisbursedList from './LoansDisbursedList/index';
import Returns from './Returns';
import TodayCollection from './ReturnYTD';
import UpcomingCollection from './TotalAssets';
import Investments from './Investments';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useGlobal from '../../../hooks/useGlobal';
import useAuth from '../../../hooks/useAuth';

const timeRanges = [
  {
    id: 'today',
    text: 'Hoy'
  },
  {
    id: 'week',
    text: 'Semana'
  },
  {
    id: 'month',
    text: 'Mes'
  },
  {
    id: 'past_month',
    text: 'Mes Anterior'
  },
  {
    id: 'year',
    text: 'Año'
  },
  {
    id: 'last_7_days',
    text: '7 días'
  },
  {
    id: 'last_30_days',
    text: '30 días'
  },
  {
    id: 'last_60_days',
    text: '60 días'
  },
  {
    id: 'last_year',
    text: '360 días'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  rootG: {
    flexGrow: 1,
  }
}));

const DashboardView = () => {
  const classes = useStyles();
  const { user } = useAuth()
  const { investmentAccounts } = user
  const [timeRange, setTimeRange] = useState(timeRanges[2].id);
  const isMountedRef = useIsMountedRef();
  const [investmentAccount, setInvestmentAccount] = useState(null)

  const getInvestmentAccount = useCallback(async () => {
    try {
      if (isMountedRef.current && investmentAccounts) {
        setInvestmentAccount(investmentAccounts[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, investmentAccounts]);

  useEffect(() => {
    getInvestmentAccount();
  }, [getInvestmentAccount]);

  if (!investmentAccount) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Ribo | Dashboard"
    >
      <Container maxWidth="lg">
        <Header investmentAccounts={investmentAccounts}
                investmentAccount={investmentAccount}
                setInvestmentAccount={setInvestmentAccount}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                timeRanges={timeRanges}
        />
        <Box mt={3} className={classes.rootG}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid
            item
            container
            direction="column"
            lg={3}
            xs={12}
            >
              <Box>
                  <Returns
                    investmentAccount={investmentAccount} />
              </Box>
              <Box mt={3}>
                  <TodayCollection
                    investmentAccount={investmentAccount}
                    timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <UpcomingCollection
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <CashOnHand
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <Investments
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
          </Grid>
          <Grid
            item
            container
            lg={9}
            sm={12}
            xs={12}
            >
              <Box>
                <PaymentsOverTime
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
            <Box mt={3}>
              <PaymentsOverTimeCumulative
                investmentAccount={investmentAccount}
                timeRange={timeRange}/>
            </Box>
              <Box mt={3}>
                <PaymentsReceivedList
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <LoanDisbursedList
                  investmentAccount={investmentAccount}
                  timeRange={timeRange}/>
              </Box>
          </Grid>
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  sm={6}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <Returns country={country} />*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  sm={6}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <TodayCollection country={country} timeRange={timeRange}/>*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  sm={6}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <UpcomingCollection country={country} timeRange={timeRange}/>*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  sm={6}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <RoiPerCustomer country={country} timeRange={timeRange}/>*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <LoansDisbursedNumber country={country}/>*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={9}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <LatestProjects country={country}/>*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <LoansDisbursedNumber country={country}/>*/}
          {/*</Grid>*/}
        </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default DashboardView;
