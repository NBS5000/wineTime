import React/*, {useState}*/ from 'react';
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
                <Link className="" to="/me">
                  View My Profile
                </Link>
                <button className="" onClick={logout}>
                <img src="../../assets/images/logout.png" alt="logout" className="log" />
                </button>
                </div>
              </>
            ) : (
              <>
              <div className="up">
                <Link to="/login" id="login" className="logSign">
                  <img src="../../assets/images/login.png" alt="login" className="log" />
                </Link>
                <Link  to="/signup" id="signup" className="logSign">
                <img src="../../assets/images/signup.png" alt="signup" className="log" />
                </Link>
                </div>
              </>
            )}

      </header>
    </div>
  );
};

export default Header;
