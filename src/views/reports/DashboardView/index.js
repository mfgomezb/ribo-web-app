import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import PaymentsReceived from './PaymentsReceived';
import PaymentsReceivedList from './PaymentsReceivedList';
import PaymentsOverTime from './PaymentsOverTime';
import LoanDisbursedList from './LoansDisbursedList/index';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import EarningsSegmentation from './EarningsSegmentation';
import LateCollection from './LateCollection';
import TodayCollection from './TodayCollection';
import UpcomingCollection from './UpcomingCollection';
import useLocationOptions from '../../../hooks/useUserLocation';
import LoansDisbursed from './LoansDisbursed';

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
  const countries = useLocationOptions()
  const [country, setCountry] = useState(countries[0].id)
  const [timeRange, setTimeRange] = useState(timeRanges[2].id);

  return (
    <Page
      className={classes.root}
      title="Ribo | Dashboard"
    >
      <Container maxWidth="lg">
        <Header countries={countries}
                country={country}
                setCountry={setCountry}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                timeRanges={timeRanges}
        />
        <Box mt={3} className={classes.rootG}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid
            item
            lg={3}
            xs={12}
            >
              <Box>
                  <LateCollection
                    country={country} />
              </Box>
              <Box mt={3}>
                  <TodayCollection
                    country={country}
                    timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <UpcomingCollection
                  country={country}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <PaymentsReceived
                  country={country}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <LoansDisbursed
                  country={country}
                  timeRange={timeRange}/>
              </Box>
          </Grid>
          <Grid
            item
            lg={9}
            >
              <Box>
                <PaymentsOverTime
                  country={country}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <PaymentsReceivedList
                  country={country}
                  timeRange={timeRange}/>
              </Box>
              <Box mt={3}>
                <LoanDisbursedList
                  country={country}
                  timeRange={timeRange}/>
              </Box>
          </Grid>
          {/*<Grid*/}
          {/*  item*/}
          {/*  lg={3}*/}
          {/*  sm={6}*/}
          {/*  xs={12}*/}
          {/*>*/}
          {/*  <LateCollection country={country} />*/}
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
