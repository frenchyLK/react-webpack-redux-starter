import React from 'react';
import autobind from 'class-autobind';
import { shouldComponentUpdate }  from 'react-immutable-render-mixin';
/*
  Simple helper component which will autobind all functions on a component
  This is necessary becasue the reference to "this" can be lost in React components
  when you are performing callbacks from child functions.

  Additionally, this component also wraps itself in a higher-order component (HoC)
  to ensure re-renders are only performed as needed. Even though, by default,
  React will prevent rerenders if no data has changed, two objects are never equal
  unless they are references to the same objects, not just the same value.

  The react-immutable-render-mixin updates the showComponentUpdate function
  on all components (that extend this) to use the ImmutableJS built in
  comparison functions to ensure that even complex objects, so long as they are
  Immutable, will be compared on VALUE not on REFERENCES
*/
class AutobindComponent extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }
}

// we are default the translation function
// so we don't have to define it in tests
AutobindComponent.defaultProps = {
  t: e => e
}

export default AutobindComponent;
