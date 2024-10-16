import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ModalContextProvider } from "./context/ModalContext.jsx";
import "@radix-ui/themes/styles.css";
import { LayoutContextProvider } from "./context/LayoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeContextProvider>
        <LayoutContextProvider>
          <ModalContextProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </ModalContextProvider>
        </LayoutContextProvider>
      </ThemeContextProvider>
    </Provider>
  </PersistGate>
);
