import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import EarningsSegmentation from './EarningsSegmentation';
import LateCollection from './LateCollection';
import TodayCollection from './TodayCollection';
import UpcomingCollection from './UpcomingCollection';
import useLocationOptions from '../../../hooks/useUserLocation';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
  const classes = useStyles();
  const countries = useLocationOptions()
  const [country, setCountry] = useState(countries[0].id)

  return (
    <Page
      className={classes.root}
      title="Ribo | Dashboard"
    >
      <Container maxWidth={false}>
        <Header countries={countries} country={country} setCountry={setCountry} />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <LateCollection country={country}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TodayCollection country={country}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <UpcomingCollection country={country}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <RoiPerCustomer country={country}/>
          </Grid>
          <Grid
            item
            lg={3}
            xs={12}
          >
            <RealTime />
          </Grid>
          <Grid
            item
            lg={9}
            xs={12}
          >
            <PerformanceOverTime country={country}/>
          </Grid>
          <Grid
            item
            lg={7}
            xl={8}
            xs={12}
          >
            <LatestProjects country={country}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
