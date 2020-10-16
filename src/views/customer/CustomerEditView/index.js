import React, {
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom'
import CustomerEditForm from './CustomerEditForm';
import Header from './Header';
import { useGetUser } from '../../../hooks/useUser';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerEditView = () => {
  const classes = useStyles();
  const {customerId} = useParams()
  const {isLoading, data, error } = useGetUser(customerId)

  if (isLoading) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer Edit"
    >
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CustomerEditForm customer={data} />
        </Container>
      </Box>
    </Page>
  );
};

export default CustomerEditView;
