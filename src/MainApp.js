/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Auth from '@aws-amplify/auth';

import theme from './theme';
import MainLayout from './layouts/MainLayout';
import LandingPageLayout from './layouts/LandingPageLayout';

import Login from './views/login';
import Dashboard from './views/dashboard';
import Settings from './views/settings';
import ForgetPassword from './views/forgetPassword';
import ChangePassword from './views/forgetPassword/changePassword';
import Challenge from './views/challenge';
import Buildings from './views/building';
import Tasks from './views/tasks';
import Users from './views/users';
import Template from './views/template';
import Title from './components/Title';

import { setAuthFlag } from './store/auth';

function MainApp({ setAuthFlag })
{
  const [authenticating, setAuthenticating] = useState(true);

  // checking  user session
  async function loadSession()
  {
    try {
      await Auth.currentSession();
      setAuthFlag({ authenticated: true });
    } catch (error) {
      setAuthFlag({ authenticated: false });
    }
    setAuthenticating(false);
  }

  // componentDidMount
  useEffect(() =>
  {
    loadSession();
  }, []);

  if (authenticating) return <div>Loading...</div>;

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon */}
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPageLayout>
                <Login />
              </LandingPageLayout>
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/tasks"
            render={() => (
              <MainLayout>
                <Tasks />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/templates"
            render={() => (
              <MainLayout>
                <Template />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/settings"
            render={() => (
              <MainLayout>
                <Settings />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/buildings"
            render={() => (
              <MainLayout>
                <Buildings />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/users"
            render={() => (
              <MainLayout>
                <Users />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/forgotPassword"
            render={() => (
              <LandingPageLayout>
                <ForgetPassword />
              </LandingPageLayout>
            )}
          />
          <Route
            exact
            path="/changePassword"
            render={() => (
              <LandingPageLayout>
                <ChangePassword />
              </LandingPageLayout>
            )}
          />
          <Route
            exact
            path="/setNewPassword"
            render={() => (
              <LandingPageLayout>
                <Challenge />
              </LandingPageLayout>
            )}
          />
          <Route
            exact
            path="*"
            render={() => (
              <MainLayout>
                <Title text="Not found" />
              </MainLayout>
            )}
          />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
}

MainApp.propTypes = {
  setAuthFlag: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    setAuthFlag: (payload) =>
    {
      dispatch(setAuthFlag(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(MainApp);
