import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // function proceed(){
  //   setTimeout((1600));
  //   const nextURL = '/profile';
  //   const nextTitle = 'WineTime';
  //   const nextState = { additionalInformation: 'Updated the URL with JS' };
  //   window.history.pushState(nextState, nextTitle, nextURL);
    
  
  // }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div id="logInBody"> 
      
            {data ? (


              <p>
                  Success!
              </p>

            ) : (
              <form onSubmit={handleFormSubmit} id="logForm">
                <input
                  className="searchField"
                  placeholder=" "
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label 
                  htmlFor="loginEmail" 
                  className="searchLabel">Email</label>
                <input
                  className="searchField"
                  placeholder=" "
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <label 
                  htmlFor="loginPassword" 
                  className="searchLabel">Password</label>

                <div id="logBtnGroup">
                  <button
                    className="logBtn"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                  
                  <Link to="/" className="logBtn canxBtn">Cancel</Link>
                </div>


              </form>
            )}

            {error && (
              <div className="">
                {error.message}
              </div>
            )}
      
    </div>
  );
};

export default Login;
