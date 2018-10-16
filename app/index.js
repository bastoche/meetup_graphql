// @flow

import React from "react";
import ReactDOM from "react-dom";

import User from "./User";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(<User />, rootElement);
}
