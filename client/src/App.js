import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './utils/auth';

import Header from './components/Header';
import Footer from './components/Footer';
import Bg from './components/Bg';
import Fun from './components/Fun';
import Navigation from './components/Navigation';

import Home from './pages/Home';
import Login from './pages/Login';
import MyWine from './pages/MyWine';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Signup from './pages/Signup';

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
                <Header />

                {!Auth.loggedIn() ? (
                  <>
                    {/* <div id="pleaseDiv">
                      <h2 id="pleaseH2" className="dance">Please log in</h2>
                    </div> */}
                    <div id="mainContent">
                      <Fun />
                    </div>
                  </>
                ) : (
                  <>
                    <Navigation />
                    <div id="mainContent">
                      <Fun />
                    </div>
                  </>
                )}

                <Routes>
                    <Route 
                      path="/" 
                      element={<Home />}
                    />
                    <Route 
                      path="/login" 
                      element={<Login />}
                    />
                    <Route 
                      path="/search" 
                      element={<Search />}
                    />
                    <Route 
                      path="/mywine" 
                      element={<MyWine />}
                    />
                    <Route 
                      path="/signup" 
                      element={<Signup />}
                    />
                    <Route 
                      path="/me" 
                      element={<Profile />}
                    />
                    <Route 
                      path="/profiles/:profileId"
                      element={<Profile />}
                    />
                </Routes>
                <Footer />
            </ApolloProvider>
        </div>
    );
}

export default App;
