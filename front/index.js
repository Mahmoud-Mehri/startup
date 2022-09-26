import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app";
import { configureStore } from "./src/redux/store";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
