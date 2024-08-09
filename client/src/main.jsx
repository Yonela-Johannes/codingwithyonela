import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import { ModalContextProvider } from "./context/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeContextProvider>
        <ModalContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ModalContextProvider>
      </ThemeContextProvider>
    </Provider>
  </PersistGate>
);
