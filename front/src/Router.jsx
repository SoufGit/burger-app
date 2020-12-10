import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import LayoutContainer from 'Components/layout/LayoutContainer';
import BigCalendar from 'Components/calendar/CalendarContainer';
import MaterialTableContainer from 'Components/table/MaterialTableContainer';
import TableContainer from 'Components/table/TableContainer';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';
import App from './App';

const Router = () =>
    <BrowserRouter>
        <ErrorBoundary>
            <LayoutContainer>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={(props) => <ErrorBoundary><App {...props} /></ErrorBoundary>}
                    />
                    <Route
                        path="/cra"
                        component={(props) => <ErrorBoundary><BigCalendar {...props} /></ErrorBoundary>}
                    />
                    <Route
                        path="/administration"
                        component={(props) => <ErrorBoundary><TableContainer {...props} /></ErrorBoundary>}
                    />
                    <Route
                        path="/employees"
                        component={(props) => <ErrorBoundary><MaterialTableContainer {...props} /></ErrorBoundary>}
                    />
                    <Route
                        path="/employee(:id)"
                        component={(props) => <ErrorBoundary><MaterialTableContainer {...props} /></ErrorBoundary>}
                    />
                </Switch>
            </LayoutContainer>
        </ErrorBoundary>
    </BrowserRouter>;

export default Router;
