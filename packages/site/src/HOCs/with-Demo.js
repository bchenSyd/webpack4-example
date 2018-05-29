import React, { Component, createElement } from "react";
import { wrapDisplayName, hoistStatics } from "recompose";

export default function wrapWithDemo(WrappedComponent) {
  class WithTest extends Component {
    constructor() {
      super();
      this.state = {};
    }
    addExtraProps = () => ({
      extra: "this is an extra"
    });
    render() {
      return (
        <div>
          <div> with-demo HOC </div>
          <div style={{ border: "1px solid red" }}>
            {createElement(WrappedComponent, this.addExtraProps())}
          </div>
        </div>
      );
    }
  }
  WithTest.WrappedComponent = WrappedComponent;
  WithTest.displayName = wrapDisplayName(WrappedComponent, "with-demo");
  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistStatics(() => WithTest, {} /*empty blackklist*/)(
    WrappedComponent
  );
}
