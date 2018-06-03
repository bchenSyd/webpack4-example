import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./components/Home";
import { WithStateWrapped2 as WithState } from './components/with-state';
import Counter from "./components/counter";
import CounterComposed from "./components/counter-composed";

class App extends Component {
  render() {
    return (
      <div>
        <Home extra="from owner" />
        <br />
        <WithState />
        <br />
        <Counter />
        <br />
        <CounterComposed />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
