import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../pages/home";
import Battle from "../../pages/battle";
import Group from "../../pages/group";
import Popular from "../../pages/popular";
import "./Layout.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layout">
        <div className="main">
          <Router>
            <div className="navigation">
              <Link to="/" className="navigationLink">
                Home
              </Link>
              <Link to="/battle" className="navigationLink">
                Battle
              </Link>
              <Link to="/group" className="navigationLink">
                Group
              </Link>
              <Link to="/popular" className="navigationLink">
                Pupular
              </Link>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/battle">
                  <Battle />
                </Route>
                <Route path="/group">
                  <Group />
                </Route>
                <Route path="/popular">
                  <Popular />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Layout;
