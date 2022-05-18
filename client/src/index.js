import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/reset.css';
import './assets/css/input.css';
import './assets/css/var.css';
import './assets/css/index.css';
import './assets/css/bg.css';
import './assets/css/headFoot.css';
import './assets/css/grapeInfo.css';
import './assets/css/home.css';
import './assets/css/profile.css';


import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
