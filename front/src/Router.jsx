import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import LayoutContainer from 'Components/layout/LayoutContainer';
import BigCalendar from 'Components/calendar/CalendarContainer';
import MaterialTableContainer from 'Components/table/MaterialTableContainer';
import TableContainer from 'Components/table/TableContainer';
import App from './App';

const Router = () =>
    <BrowserRouter>
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={(props) => <App {...props} />}
                />
                <Route
                    path="/cra"
                    component={(props) => <BigCalendar {...props} />}
                />
                <Route
                    path="/administration"
                    component={(props) => <TableContainer {...props} />}
                />
                <Route
                    path="/employees"
                    component={(props) => <MaterialTableContainer {...props} />}
                />
                <Route
                    path="/employee(:id)"
                    component={(props) => <MaterialTableContainer {...props} />}
                />
            </Switch>
        </LayoutContainer>
    </BrowserRouter>;

export default Router;
