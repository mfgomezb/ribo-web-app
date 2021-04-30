import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LoanQuoteForm from './LoanQuoteForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

const ProductCreateView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Ribo | Cotización"
    >
      <Container maxWidth="lg">
        <Header />
        <LoanQuoteForm />
      </Container>
    </Page>
  );
};

export default ProductCreateView;
