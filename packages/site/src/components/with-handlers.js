import React, { Component } from "react";
import { compose, withState, withHandlers } from "recompose";

class BaseComponent extends Component {
  componentWillReceiveProps(nextProps) {
    const { time, increase, decrease, reset } = this.props;
    const { time: timeNext, increase: increaseNext } = nextProps;
    console.log("time equal?", time === timeNext);
    console.log("with-handlers equal?", increase === increaseNext);
  }

  render() {
    const { time, count, increase, decrease, reset } = this.props;
    return (
      <div style={{ border: "1px solid green", padding: "10px" }}>
        <div>
          from owner props. {"{"} time: {time} {"}"}
        </div>
        <div>
          <label>
            count:
            {count}{" "}
          </label>
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
          <button onClick={reset}>reset</button>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  withState("count", "updateCount", 0),
  withHandlers({
    // which is pretty much like mapProps HOC (map udpateCount prop into a new function)
    increase: ({ updateCount }) => () => updateCount(n => ++n),
    decrease: ({ updateCount }) => () => updateCount(n => --n),
    reset: ({ updateCount }) => () => updateCount(0)
  })
);

export default enhance(BaseComponent);
