import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import Backdrop from '../src/components/Backdrop'
import ConfirmationModal from '../src/components/Modal'
import { SnackbarProvider } from 'notistack';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GlobalStyles from 'src/components/GlobalStyles';
import ScrollReset from 'src/components/ScrollReset';
import CookiesNotification from 'src/components/CookiesNotification';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import SettingsNotification from 'src/components/SettingsNotification';
import { AuthProvider } from 'src/contexts/JWTAuthContext';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import routes, { renderRoutes } from 'src/routes';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();
const queryCache = new QueryCache();

const queryConfig = {
    enabled: true,
    retry: 3,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity
}

const App = () => {
  const { settings } = useSettings();
  const dispatch = useDispatch();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  return (
    <ReactQueryCacheProvider queryCache={queryCache} config={queryConfig}>
      <ReactQueryDevtools initialIsOpen />
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider dense maxSnack={3}>
              <Router history={history}>
                <AuthProvider>
                  <GlobalStyles />
                  <ScrollReset />
                  <GoogleAnalytics />
                  <CookiesNotification />
                  <SettingsNotification />
                  {renderRoutes(routes)}
                </AuthProvider>
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
