import React from "react";
import "../components/Home/home.css";
import { Tabs, Tab } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { click } = this.props;
    return (
      <div className="home-container">
        <img
          src="https://battle-arena.my/wp/wp-content/uploads/2018/10/BAlogoRED-Copy.png"
          width="70%"
        ></img>
        <p className="home-description">Are you ready to fight?</p>

        <div>
          <Tabs>
            <Link to="/battle" className="navigationLink">
              <Tab label="Yes" onClick={() => click()} />
            </Link>
            <Link to="/notReady" className="navigationLink">
              <Tab label="No" />
            </Link>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Home;
