import React from 'react';
import App from '../App';
import PrivateRoute from './protectedRoute';
import Auth from '../pages/Auth';
import ResultPage from '../pages/searchResults';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout } from '../Components/Layout';

const ResultPageWithLayout = () => <Layout Component={ResultPage} />;

const AllRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact={true} path="/" Component={App} />
            <PrivateRoute
                exact
                path="/results"
                Component={ResultPageWithLayout}
            />
            <Route exact path="/login" component={Auth} />
        </Switch>
    );
};
export default AllRoutes;
