import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CustomerActivity from './CustomerActivity';
import EarningsSegmentation from './EarningsSegmentation';
import PortfolioSegmentation from './PortfolioSegmentation';
import FinancialStats from './FinancialStats';
import Header from './Header';
import LatestOrders from './LatestOrders';
import MostProfitableProducts from './MostProfitableProducts';
import Overview from './Overview';
import TopReferrals from './TopReferrals';
import useGlobal from '../../../hooks/useGlobal';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import AllocationOverTime from './AllocationOverTime';
import PortfolioSummary from './PortfolioSummary';

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
  const { countries } = useGlobal()
  const [timeRange, setTimeRange] = useState(timeRanges[2].id);
  const isMountedRef = useIsMountedRef();
  const [country, setCountry] = useState(null)

  const getCountry = useCallback(async () => {
    try {
      if (isMountedRef.current && countries) {
        setCountry(countries[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCountry();
  }, [getCountry]);

  if (!country) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard Alternative"
    >
      <Container maxWidth={'lg'}>
        <Header countries={countries}
                country={country}
                setCountry={setCountry}
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
            <AllocationOverTime country={country}/>
          </Grid>
          <Grid
            item
            lg={4}
            xl={3}
            xs={12}
          >
            <PortfolioSegmentation country={country}/>
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopReferrals country={country}/>
          </Grid>
          <Grid
            item
            lg={8}
            xl={9}
            xs={12}
          >
            <FinancialStats country={country} />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <PortfolioSummary country={country} />
          </Grid>
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={8}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <LatestOrders />*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={4}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <CustomerActivity />*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={8}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <MostProfitableProducts country={country}/>*/}
          {/*</Grid>*/}

        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardPortfolioView;
