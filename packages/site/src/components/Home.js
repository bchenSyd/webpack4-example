import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { greeting } from "my-lib";
import suburb from "my-s";
import WithDemo from "../HOCs/with-Demo";
import { compose, withState } from "recompose";

export class Home extends Component {
  prop = {
    name: "instance prop"
  };

  render() {
    const { extra, counter, ...rest } = this.props
    return [
      <div key='_key1'>
        <h1>{greeting} !</h1>
        <pre>suburb: {suburb}</pre>

        <h2>from HOC :{extra}</h2>
      </div>,
      <div key='_key2' style={{ marginTop: "10px" }}>counter: {counter}</div>
    ];
  }

  static propTypes = {
    name: PropTypes.string
  };
}

// right to left ; same as Ramda::compose "Performs right-to-left function composition."
const enhance = compose(WithDemo, withState("counter", "setCounter", 10));
export default enhance(Home);
