import React from 'react';
import {
    withState,
    withHandlers,
    withStateHandlers,
    compose
} from 'recompose';

const BaseComponent1 = ({ count, updateCount }) => (
    <div>
        <label>count: {count} </label>
        <button onClick={() => {
            updateCount(n => ++n)
        }}>+</button>
        <button onClick={() => {
            updateCount(n => --n)
        }} >-</button>
        <button onClick={() => {
            updateCount(0)
        }} >reset</button>
    </div>
)
export const WithStateWrapped1 = withState('count', 'updateCount', 0)(BaseComponent1);


const BaseComponent = ({ count, increase, decrease, reset }) => (
    <div>
        <label>count: {count} </label>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
        <button onClick={reset}>reset</button>
    </div>
)

const enhance = compose(
    withState('count', 'updateCount', 0),
    withHandlers({
        // which is pretty much like mapProps HOC (map udpateCount prop into a new function)
        increase: ({ updateCount }) => () => updateCount(n => ++n),
        decrease: ({ updateCount }) => () => updateCount(n => --n),
        reset: ({ updateCount }) => () => updateCount(0)
    }));

export const WithStateWrapped2 = enhance(BaseComponent);
