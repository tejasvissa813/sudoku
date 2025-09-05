import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("index");
console.log("Auth0 domain:", process.env.REACT_APP_AUTH0_DOMAIN);
console.log("Auth0 clientId:", process.env.REACT_APP_AUTH0_CLIENT_ID);
root.render(
  //<React.StrictMode>
    <HashRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_ID}
        authorizationParams={{
          redirect_uri: window.localStorage.origin
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
      >
        <App /> 
      </Auth0Provider>
    </HashRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
