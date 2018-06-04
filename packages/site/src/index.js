import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './app';

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
ReactDom.render(
  <Router>
    <Route component={App} />
  </Router>,
  document.querySelector("#root")
);
