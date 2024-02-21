import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import client from "./apollo/client";

import reducer from "./store/reducers";
import { rootSaga } from "./store/sagas";

import "./index.css";
import "@preline/overlay";

import App from "./App";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
