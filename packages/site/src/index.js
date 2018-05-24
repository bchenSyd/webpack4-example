import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

class Home extends Component {

    prop = {
        name: 'instance prop'
    }

    render() {
        return (
            <div>
                <h1>this is a test component</h1>
            </div>
        );
    }

   static PropTypes = {
        name: PropTypes.string
    }
}


class App extends Component {
    render() {
        return <Home />;
    }
}

ReactDom.render(<App />, document.querySelector('#root'));