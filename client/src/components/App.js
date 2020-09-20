import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { fetchUser } from '../store/auth/operations';
import { ErrorBoundary } from './ErrorBoundary';
import { Dashboard } from './Dashboard';
import { Landing } from './Landing';
import { Layout } from './Layout';
import { SurveyNew } from './SurveyNew';

const theme = createMuiTheme();

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <ErrorBoundary>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <Layout>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/surveys" component={Dashboard}/>
                <Route path="/surveys/new" component={SurveyNew}/>
              </Switch>
            </Layout>
          </SnackbarProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}
