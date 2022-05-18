import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <div id="signUpBody">

            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} id="signForm">
                <input
                  id="signUpName"
                  placeholder=" "
                  className="searchField"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />                
                <label 
                  htmlFor="signUpName" 
                  className="searchLabel">Username</label>
                <input
                  id="signUpEmail"
                  placeholder=" "
                  className="searchField"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label 
                  htmlFor="signUpEmail" 
                  className="searchLabel">Email</label>
                <input
                  id="signUpPassword"
                  placeholder=" "
                  className="searchField"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <label 
                  htmlFor="signUpPassword" 
                  className="searchLabel">Password</label>

                <div id="signBtnGroup">
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
              <div>
                {error.message}
              </div>
            )}
          </div>
  );
};

export default Signup;
