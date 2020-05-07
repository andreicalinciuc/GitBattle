import React from "react";
import "../components/Home/home.css";
import { Tabs, Tab } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Home extends React.Component {
  render() {
    const { click } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={1000}
      >
        <div className="home-container">
          <img
            src={require("../assets/gitBattle.png")}
            width="70%"
            alt="logo"
          ></img>
          <p className="home-description">Are you ready to fight?</p>

          <div>
            <Tabs value={false}>
              <Link to="/battle" className="navigationLink">
                <Tab label="Yes" onClick={() => click()} />
              </Link>
              <Link to="/notReady" className="navigationLink">
                <Tab label="No" />
              </Link>
            </Tabs>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Home;
