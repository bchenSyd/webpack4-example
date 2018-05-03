import React, {Component} from 'react';
import ReactDom from 'react-dom';

const Home = () => {
    return (
        <div>
            <h1>this is a test component</h1>
        </div>
    );
};


class App extends Component {
    render() {
        return <Home />;
    }
}

ReactDom.render(<App/>, document.querySelector('#root'));