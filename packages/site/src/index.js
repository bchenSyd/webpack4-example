import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./components/Home";
import Counter from "./components/counter";

class App extends Component {
  render() {
    return (
      <div>
        <Home extra="from owner" />
        <Counter />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
