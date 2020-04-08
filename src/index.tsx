import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import AnalyticsProvider from './components/AnalyticsProvider/AnalyticsProvider';
import UIStateProvider from './components/UIStateProvider/UIStateProvider';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import theme from './theme';
import './types';
import { VideoProvider } from './components/VideoProvider';

const VideoApp = () => {
  const { error, setError } = useAppState();

  return (
    <VideoProvider onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <App />
    </VideoProvider>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <AppStateProvider>
            <AnalyticsProvider>
              <UIStateProvider>
                <Switch>
                  <Route exact path="/">
                    <Register />
                  </Route>
                  <PrivateRoute path="/lobby">
                    <VideoApp />
                  </PrivateRoute>
                  <PrivateRoute path="/room/:URLRoomName">
                    <VideoApp />
                  </PrivateRoute>
                  <Redirect to="/" />
                </Switch>
              </UIStateProvider>
            </AnalyticsProvider>
          </AppStateProvider>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
