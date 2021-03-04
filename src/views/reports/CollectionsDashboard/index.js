import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardAlternativeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Ribo | Cobranza"
    >
      <Container maxWidth={'xl'}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Results />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardAlternativeView;
