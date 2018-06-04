import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { WithStateWrapped1 as WithState} from "./components/with-state";
import CounterStreamed from "./components/counter-streamed";
import CounterStreamedComposed from "./components/counter-streamed-composed";
import Iframe from "./components/iframe";

const Links = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/withstate">with state</Link>
    </li>
    <li>
      <Link to="/streamed">streamed</Link>
    </li>
    <li>
      <Link to="/streamed-composed">mapPropsStream</Link>
    </li>
    <li>
      <Link to="/iframe">iframe</Link>
    </li>
  </ul>
);
const App = () => {
  return (
    <div>
      <div>header</div>
      <div id="content">
        <Links />
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/withstate" component={WithState} />
          <Route path="/streamed" component={CounterStreamed} />
          <Route
            path="/streamed-composed"
            component={CounterStreamedComposed}
          />
          <Route path="/iframe" component={Iframe} />
        </Switch>
      </div>
      <div>footer</div>
    </div>
  );
};

export default App;
