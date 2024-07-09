import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeContextProvider>
        <GoogleOAuthProvider clientId="911304917763-lou0bgv2hh2k0h3e781psr9mcmukftup.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ThemeContextProvider>
    </Provider>
  </PersistGate>
);
