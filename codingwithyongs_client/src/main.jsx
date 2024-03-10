import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <GoogleOAuthProvider clientId="911304917763-lou0bgv2hh2k0h3e781psr9mcmukftup.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthContext>
  </React.StrictMode>
);
