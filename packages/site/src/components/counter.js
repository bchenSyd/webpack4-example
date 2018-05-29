import React from "react";
import rxjsConfig from "recompose/rxjsObservableConfig";
import {
  componentFromStreamWithConfig,
  createEventHandlerWithConfig
} from "recompose";
import rxjsconfig from "recompose/rxjsObservableConfig";

const componentFromStream = componentFromStreamWithConfig(rxjsConfig);
const createEventHandler = createEventHandlerWithConfig(rxjsconfig);

const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler();
  const { handler: decrement, stream: decrement$ } = createEventHandler();
  const count$ = increment$.mapTo(1)
    .merge(decrement$.mapTo(-1))
    // merge: similar to combineLatest, will relay the value whichever observables emitts;
    .map( (args)=>{
        return args;
    })
    .startWith(0)
    // reducer
    .scan((count, n) => count + n, 0);

  return props$.combineLatest(count$, (props, count) => (
    <div {...props}>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  ));
});

export default Counter;
