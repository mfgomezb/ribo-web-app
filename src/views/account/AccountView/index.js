import React, { useState } from 'react';
import { useUpdatePassword } from '../../../hooks/useUser';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import Subscription from './Subscription';
import Notifications from './Notifications';
import Security from './Security';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const AccountView = () => {
  const { user } = useAuth();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');
  const [updatePassword, updatePasswordInfo] = useUpdatePassword(user._id);
  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && (
            <Security
              onSubmit={updatePassword}
              clearOnSubmit
              isLoading={updatePasswordInfo.isLoading}
              submitText={
                updatePasswordInfo.isLoading
                  ? 'Saving...'
                  : updatePasswordInfo.isError
                  ? 'Error!'
                  : updatePasswordInfo.isSuccess
                  ? 'Saved!'
                  : 'Change password'
              }
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
