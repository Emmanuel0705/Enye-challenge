import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-boost';
import { PersistGate } from 'redux-persist/integration/react';
import AllRoutes from './Route';

const httpLink = createHttpLink({
    // uri: 'https://locator-graphql.herokuapp.com/graphql',
    uri: 'http://localhost:5000/graphql',
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: httpLink,
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.StrictMode>
                    <BrowserRouter>
                        <AllRoutes />
                    </BrowserRouter>
                </React.StrictMode>
            </PersistGate>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
