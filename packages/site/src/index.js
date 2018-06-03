import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./components/Home";
import { WithStateWrapped2 as WithState } from './components/with-state';
import Counter from "./components/counter";
import CounterComposed from "./components/counter-composed";

class App extends Component {
  state={
    time: Date.now()
  };

  onClick = ()=>{
    this.setState({
      time: Date.now()
    })
  }
  render() {
    const { time } = this.state;
    return (
      <div>
        <button onClick={this.onClick} >update Owner props</button>
        <Home extra="from owner" time={time }/>
        <br />
        <WithState time={time }/>
        <br />
        <Counter time={time }/>
        <br />
        <CounterComposed time={time }/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
