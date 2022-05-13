import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>


      <header>

            <h1 className="dance" id="title">
              WineTime
            </h1>



            {Auth.loggedIn() ? (
              <>
              <div className="up">
                <Link className="btn btn-lg btn-primary m-2" to="/me">
                  View My Profile
                </Link>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                <img src="../../assets/images/logout.png" alt="logout image" classnName="log" />
                </button>
                </div>
              </>
            ) : (
              <>
              <div className="up">
                <Link to="/login" id="login" className="logSign">
                  <img src="../../assets/images/login.png" alt="login image" classnName="log" />
                </Link>
                <Link  to="/signup" id="signup" className="logSign">
                <img src="../../assets/images/signup.png" alt="signup image" classnName="log" />
                </Link>
                </div>
              </>
            )}

      </header>
    </div>
  );
};

export default Header;
