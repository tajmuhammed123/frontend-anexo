import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraBaseProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraBaseProvider>
          <ThemeProvider>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GAUTH}>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </GoogleOAuthProvider>
          </ThemeProvider>
        </ChakraBaseProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
