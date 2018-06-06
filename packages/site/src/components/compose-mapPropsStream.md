
> https://github.com/acdlite/recompose/pull/182#issue-70958588

```js
// Wraps the base component in three container components
compose(
    mapPropsStream(transformA), // first  Wrapper created
    mapPropsStream(transformB), // second Wrapper created
    mapPropsStream(transformC)  // third  Wrapper created
  )(BaseComponent)
  
  // Same as this, which wraps the base component in a single
  // container component
  mapPropsStream(  // only one wrapper created
    compose(transformA, transformB, transformC)
  )(BaseComponent)
```


