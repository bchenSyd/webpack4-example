import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import logo from "./styles/logo.svg";
import Home from "./components/Home";
import WithState from "./components/with-state";
import WithHandlers from "./components/with-handlers";
import CounterStreamed from "./components/counter-streamed";
import CounterStreamedComposed from "./components/counter-streamed-composed";
import IframeInternal from "./components/iframe-internal";
import IframeExternal from "./components/iframe-external";

const Links = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/withstate">with state</Link>
    </li>
    <li>
      <Link to="/with-handlers">with handlers</Link>
    </li>
    <li>
      <Link to="/streamed">streamed</Link>
    </li>
    <li>
      <Link to="/streamed-composed">mapPropsStream</Link>
    </li>
    <li>
      <Link to="/iframe-internal">iframe internal</Link>
    </li>
    <li>
      <Link to="/iframe-external">iframe postmessage</Link>
    </li>
  </ul>
);
const App = ({location}) => {
  //const externalUrl = 'https://protectedapps-test.authbridge-nonprod.westpacgroup.com/rbdev3_sso/start.swe?SWECmd=GetApplet&SWEApplet=WBC+Activity+Form+Applet+-+BD&IsPortlet=1&SWESM=Edit&KeepAlive=1&BCField0=Id&BCFieldValue0=abcde&Scenario=NewToDo'
  const externalUrl = "http://localhost:8083";
  return (
    <div className="app">
      <header className="header-footer">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="app-title">Welcome to React</h1>
      </header>
      <div className="app-content">
        <Links />
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/withstate" component={WithState} />
          <Route
            path="/with-handlers"
            render={props => {
              // can't use a stateless component as it can't be force updated;
              // (can't proactively update itself)
              class Wrapper extends Component {
                state = {
                  time: Date.now()
                };
                onClick = () => {
                  this.setState({
                    time: Date.now()
                  });
                };
                render() {
                  return (
                    <div>
                      <button onClick={this.onClick}>udpate</button>
                      <WithHandlers time={this.state.time} />
                    </div>
                  );
                }
              }

              return <Wrapper />;
            }}
          />
          <Route path="/streamed" component={CounterStreamed} />
          <Route
            path="/streamed-composed"
            component={CounterStreamedComposed}
          />
          <Route
            path="/iframe-internal"
            render={props => <IframeInternal {...props} frameSource="/greenid" />}
          />
          <Route
            path="/iframe-external"
            render={props => <IframeExternal {...props} frameSource={externalUrl} />}
          />
        </Switch>
      </div>
      <footer className="header-footer">
        <div>copy-rght: bochen2014@yahoo.com</div>
      </footer>
    </div>
  );
};

export default App;
