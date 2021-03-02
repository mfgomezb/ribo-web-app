import React, {
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CustomerCreateWizard from './CustomerCreateWizard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerCreateView = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Nuevo cliente"
    >
      <Container maxWidth={'lg'}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CustomerCreateWizard/>
        </Container>
      </Box>
    </Page>
  );
};

export default CustomerCreateView;
