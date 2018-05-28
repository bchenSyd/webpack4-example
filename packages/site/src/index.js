import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Home from './components/Home';


class App extends Component {
    render() {
        return <Home extra="from owner"/>;
    }
}

ReactDom.render(<App />, document.querySelector('#root'));