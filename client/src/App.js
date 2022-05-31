import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import Auth from './utils/auth';

import Header from './components/Header';
import Footer from './components/Footer';
import Bg from './components/Bg';
import Fun from './components/Fun';

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


function App() {

    return (
      <div id="app">
        <Bg />
          <ApolloProvider client={client}>
            <Router>
                <Header />
                <div id="mainContent">

                {!Auth.loggedIn() ? (
                  <>
                    <div id="pleaseDiv">
                      <h2 id="pleaseH2" className="dance">Please log in</h2>
                    </div>
                  </>
                ) : (
                  <>
                  
                  </>
                )}
                <Fun />
                </div>
                <Footer />
            </Router>
          </ApolloProvider>
        </div>
    );
}

export default App;
