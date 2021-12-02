import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import RoutesEntryPoint from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <RoutesEntryPoint />
  </Provider>,
  document.getElementById("root")
);
