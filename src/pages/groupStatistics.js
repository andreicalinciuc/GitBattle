import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import FollowersCharts from "../components/GroutStatistics/FollowersCharts";
import FollowingCharts from "../components/GroutStatistics/FollowingCharts";
import PublicReposCharts from "../components/GroutStatistics/PublicReposCharts";
import PublicGistsCharts from "../components/GroutStatistics/PublicGistsCharts";
import DaysCharts from "../components/GroutStatistics/DaysCharts";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "../components/GroutStatistics/FollowersCharts";
class Statistics extends PureComponent {
  render() {
    let leftListName = this.props.leftTeam.map((item) => {
      return item.name;
    });
    let rightListName = this.props.rightTeam.map((item) => {
      return item.name;
    });
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppearTimeout={1000}
      >
        <div className="charts-container">
          <FollowersCharts
            leftTeam={this.props.leftTeam}
            rightTeam={this.props.rightTeam}
            leftListName={leftListName}
            rightListName={rightListName}
            title=" Followers "
          ></FollowersCharts>

          <FollowingCharts
            leftTeam={this.props.leftTeam}
            rightTeam={this.props.rightTeam}
            leftListName={leftListName}
            rightListName={rightListName}
            title="Following"
          ></FollowingCharts>

          <PublicReposCharts
            leftTeam={this.props.leftTeam}
            rightTeam={this.props.rightTeam}
            leftListName={leftListName}
            rightListName={rightListName}
            title="Public Repos"
          ></PublicReposCharts>
          <PublicGistsCharts
            leftTeam={this.props.leftTeam}
            rightTeam={this.props.rightTeam}
            leftListName={leftListName}
            rightListName={rightListName}
            title="Public Repos"
          ></PublicGistsCharts>
          <DaysCharts
            leftTeam={this.props.leftTeam}
            rightTeam={this.props.rightTeam}
            leftListName={leftListName}
            rightListName={rightListName}
            title="Public Repos"
          ></DaysCharts>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    leftTeam: state.group.leftTeam,
    rightTeam: state.group.rightTeam,
  };
};

export default connect(mapStateToProps, null)(Statistics);
