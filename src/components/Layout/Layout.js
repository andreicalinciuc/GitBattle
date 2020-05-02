import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../pages/home";
import Battle from "../../pages/battle";
import Group from "../../pages/group";
import Popular from "../../pages/popular";
import "./Layout.css";
import { Tabs, Tab } from "@material-ui/core";
class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <div className="main">
          <Router>
            <Tabs>
              <Link to="/" className="navigationLink">
                <Tab label="Home" />
              </Link>
              <Link to="/battle" className="navigationLink">
                <Tab label="Battle" />
              </Link>
              <Link to="/group" className="navigationLink">
                <Tab label="Group" />
              </Link>
              <Link to="/popular" className="navigationLink">
                <Tab label="Popular" />
              </Link>
            </Tabs>
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
