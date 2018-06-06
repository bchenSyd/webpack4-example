import React from "react";
import rxjsConfig from "recompose/rxjsObservableConfig";
import {
  componentFromStreamWithConfig,
  createEventHandlerWithConfig,
  mapPropsStreamWithConfig,
  compose,
} from "recompose";

//symbol-observable doesn't implement rich set of stream transformation methods; so we need to use rxjs instead;
const componentFromStream = componentFromStreamWithConfig(rxjsConfig);
const mapPropsStream = mapPropsStreamWithConfig(rxjsConfig);
const createEventHandler = createEventHandlerWithConfig(rxjsConfig);

const baseComponent = ({ count, increment, decrement, ...rest }) => (
  <div {...rest}>
    Count: {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>);


const transformA /* inject counter stream*/ = props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler();
  const { handler: decrement, stream: decrement$ } = createEventHandler();
  const count$ = increment$.mapTo(1)
    .merge(decrement$.mapTo(-1))
    .map((args) => {
      return args;
    })
    .startWith(1)
    .scan((count, n) => count + n, 0);

  return props$.combineLatest(count$, (props, count) => ({
    props,
    count,
    increment,
    decrement
  }))
}

const transformB = propsA$ /* B handle result of transformA */ => {
  return propsA$.map(({ count, ...rest }) => ({
    count: count * 2,
    ...rest
  }))
}

const CounterStreamedComposed = mapPropsStream(compose(transformB, transformA))(baseComponent);

export default CounterStreamedComposed;
