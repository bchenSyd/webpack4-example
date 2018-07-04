import React, { Component } from "react";
import { withState, withHandlers, withStateHandlers, compose } from "recompose";

const BaseComponent = ({ count, updateCount }) => (
  <div>
    <label>
      count:
      {count}{" "}
    </label>
    <button
      onClick={() => {
        updateCount(n => ++n);
      }}
    >
      +
    </button>
    <button
      onClick={() => {
        updateCount(n => --n);
      }}
    >
      -
    </button>
    <button
      onClick={() => {
        updateCount(0);
      }}
    >
      reset
    </button>
  </div>
);
export default withState("count", "updateCount", 0)(BaseComponent);
