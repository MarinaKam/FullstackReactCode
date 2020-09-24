import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { fetchUser } from '../store/auth/operations';
import { SurveyNew, SurveysProvider } from './SurveyNew';
import { ErrorBoundary } from './ErrorBoundary';
import { Dashboard } from './Dashboard';
import { Landing } from './Landing';
import { Layout } from './Layout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff'
    }
  }
});

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

                <SurveysProvider>
                  <Route exact path="/surveys" component={Dashboard}/>
                  <Route path="/surveys/new" component={SurveyNew}/>
                </SurveysProvider>
              </Switch>
            </Layout>
          </SnackbarProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}
