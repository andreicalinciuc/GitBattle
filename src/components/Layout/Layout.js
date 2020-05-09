import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../pages/home";
import Battle from "../../pages/battle";
import Group from "../../pages/group";
import Statistics from '../../pages/groupStatistics'
import Popular from "../../pages/popular";
import NotReady from "../../pages/notReady"
import "./Layout.css";
import { Tabs, Tab } from "@material-ui/core";
import history from '../../history'
class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  readyToFight = () => {
    this.setState({
      ready: true,
    });
  };
  render() {
    return (
      <div className="layout">
        <div className="main">
          <Router history={history}>
            {this.state.ready === true ? (
              <Tabs value={false} className="nav-section">
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
            ) : null}

            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home click={this.readyToFight} />
                </Route>
                <Route path="/battle">
                  <Battle />
                </Route>
                <Route path="/group">
                  <Group />
                </Route>
                <Route path="/group/statistics">
                  <Statistics/>
                </Route>
                <Route path="/popular">
                  <Popular />
                </Route>
                <Route path="/notReady">
                  <NotReady />
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
