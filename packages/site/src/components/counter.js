import React from "react";
import rxjsConfig from "recompose/rxjsObservableConfig";
import {
  componentFromStreamWithConfig,
  createEventHandlerWithConfig,
  mapPropsStreamWithConfig,
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


/*
class ComponentFromStream extends Component {
    state = { vdom: null }
    componendWillMount/ componentWillReceiveProps
        changeEmitter causes props$ to emit new value
              ⬇️
              ⬇️
              ⬇️
props$     { name:'bochen' }  --------- {name:'joanna'}   ------------- { name: 'jenny'}  ------
              ⬇️
              ⬇️  you can use all forms of transforms, map, combineLatest,merge... anything you like
              ⬇️
vdom$    <div>bchen</div>
              ⬇
              ⬇
              ⬇    ️
render() {
      return this.state.vdom
    }
*/

// stream transform is invoked by Wrapper::CWM and Wrapper::CWR
const Counter = mapPropsStream(  props$ /*raw props stream: built in Wrapper Component's consturctor*/  => {
  const { handler: increment, stream: increment$ } = createEventHandler();
  const { handler: decrement, stream: decrement$ } = createEventHandler();
  const count$ = increment$.mapTo(1)
    .merge(decrement$.mapTo(-1))
    // merge: similar to combineLatest, but won't combine; 
    // so Observable<T> must merge with another Observable that contains (emits) the same data type
    .map((args) => {
      return args;
    })
    .startWith(0)
    // reducer
    .scan((count, n) => count + n, 0);
  return props$.combineLatest(count$, (props, count) => /*transformed stream*/ ({
    props,
    count,
    increment,
    decrement
  }))
})(baseComponent);

export default Counter;
