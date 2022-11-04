import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(

  <Auth0Provider
    domain="dev-s12m77m4nsw3tmps.us.auth0.com"
    clientId="sDVXsAN1CVjzRvuWAfshP8AzRGBEFbmF"
    redirectUri={window.location.origin + process.env.PUBLIC_URL + '/'}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
  )
