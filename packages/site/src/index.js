import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { greeting } from 'my-lib';
import suburb from 'my-s';

class Home extends Component {

    prop = {
        name: 'instance prop'
    }

    render() {
        const { description, ...rest } = { description: 'this is a test component', version: 'v1.0' }
        return (
            <div>
                <h1>{greeting} !</h1>
                <h1>{description}</h1>
                <pre>suburb: {suburb}</pre>
                <pre>{JSON.stringify(rest)}</pre>
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