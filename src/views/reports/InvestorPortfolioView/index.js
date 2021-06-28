import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PortfolioSegmentation from './PortfolioSegmentation';
import FinancialStats from './FinancialStats';
import Header from './Header';
import TopReferrals from './TopReferrals';
import useGlobal from '../../../hooks/useGlobal';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import AllocationOverTime from './AllocationOverTime';
import PortfolioSummary from './PortfolioSummary';
import LateCollectionSegmentation from './LateCollectionSegmentation';
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
  }
}));

const DashboardPortfolioView = () => {
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
      title="Ribo | Cartera"
    >
      <Container maxWidth={'lg'}>
        <Header investmentAccounts={investmentAccounts}
                investmentAccount={investmentAccount}
                setInvestmentAccount={setInvestmentAccount}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                timeRanges={timeRanges}
        />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            {/*<Overview />*/}
          </Grid>
          <Grid
            item
            lg={8}
            xl={9}
            xs={12}
          >
            <AllocationOverTime investmentAccount={investmentAccount}/>
          </Grid>
          <Grid
            item
            lg={4}
            xl={3}
            xs={12}
          >
            <PortfolioSegmentation investmentAccount={investmentAccount}/>
          </Grid>
          <Grid
            item
            lg={5}
            xl={12}
            xs={12}
          >
            <LateCollectionSegmentation investmentAccount={investmentAccount}/>
          </Grid>

          <Grid
            item
            lg={7}
            xl={9}
            xs={12}
          >
            <FinancialStats investmentAccount={investmentAccount} />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopReferrals investmentAccount={investmentAccount}/>
          </Grid>
          <Grid
            item
            lg={8}
            xl={12}
            xs={12}
          >
            <PortfolioSummary investmentAccount={investmentAccount} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardPortfolioView;
