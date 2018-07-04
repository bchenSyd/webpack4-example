import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { greeting } from "my-lib";
import suburb from "my-s";
import withDemo from "@coral/HOCs/with-Demo";
import {
  mapProps,
  withProps,
  defaultProps,
  compose,
  flattenProp
} from "recompose";

export class Home extends Component {
  prop = {
    name: "instance prop"
  };

  render() {
    const { extra, count, ...rest } = this.props;
    return [
      <div key="_key1">
        <h1>{greeting}
{' '}
!
</h1>
        <pre>
          suburb:
          {suburb}
        </pre>
        <div>
          from with-Demo HOC :
          {extra}
        </div>
      </div>,
      <div key="_key2" style={{ marginTop: "10px" }}>
        from with-props HOC: {count}
      </div>
    ];
  }
}

const MapProps = mapProps(({ extra: ownerProvidedExtra }) => ({
  // this will supersede the 'extra' props passed from its owner (where the component being composed is used, usally inside a jsx with other components)
  extra: `${ownerProvidedExtra} - mapped` // the wrapped component (Home in our case, only gets one prop called 'extra' in this case)
}))(Home);

const WithProps = withProps(({ extra: ownerProvidedExtra }) => ({
  extra2: `${ownerProvidedExtra} - mapped` // now wrappedComponent will have both 'exra' and 'extra2' in its props;
}))(Home);

const DefaultProps = defaultProps({
  extra: "from defaultProps" // the props from the owner take precedence over props provided to the HoC.
})(Home);

const FlattenProp = compose(
  withProps({
    nested: {
      a: "a"
    },
    b: "b"
  }),
  flattenProp("nested")
)(Home);

// right to left ; same as Ramda::compose "Performs right-to-left function composition."
const enhance = compose(
  withDemo,
  withProps({
    count: 10
  })
);
const WithDemo = enhance(Home);

export default WithDemo;
