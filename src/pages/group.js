import React from "react";
import api from "../utility/api";
import "../components/Group/group.css";
import { Tab, Tabs } from "@material-ui/core";
import AddUser from "../components/Group/addUser";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";
import UserContainer from "../components/Group/userGroupContainer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../components/Layout/Layout.css";
import { ToastContainer, toast } from "react-toastify";
import Statistics from "../pages/groupStatistics";
import "../components/Layout/Layout.css";
class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fight: false,
      statistics: false,
      winnerScore: 0,
    };
  }

  componentDidMount = async () => {
    var leftList = await api.getListByID(
      "af8e7eb3-8f6d-11ea-bd04-e70beb125682"
    );
    var rightList = await api.getListByID(
      "cd457331-8f8e-11ea-bd04-5f6877a3510f"
    );

    this.props.setTeam(leftList, rightList);
  };

  save_datas = async () => {
    await api.saveList(
      "af8e7eb3-8f6d-11ea-bd04-e70beb125682",
      {
        users: this.props.leftTeam,
      },
      "left team"
    );
    await api.saveList(
      "cd457331-8f8e-11ea-bd04-5f6877a3510f",
      {
        users: this.props.rightTeam,
      },
      "right team"
    );
  };

  calculateWinner() {
    if (this.props.scoreLeftTeam > this.props.scoreRightTeamL) {
      return this.setState({
        winnerScore: this.props.scoreLeftTeam,
      });
    } else {
      return this.setState({
        winnerScore: this.props.scoreRightTeamL,
      });
    }
  }

  render() {
    return (
      <div>
        <ToastContainer autoClose={3500} bodyClassName="dark-toast" />
        {this.state.statistics === false ? (
          <div className="group-list-section">
            <div
              className={`group-list-container ${
                this.state.fight === true
                  ? this.state.winnerScore === this.props.scoreLeftTeam
                    ? "winner"
                    : "looser"
                  : ""
              }`}
            >
              {this.props.leftTeam.length > 0 ? (
                <div className="group-users-zone">
                  {this.state.fight === true ? (
                    <p>
                      Total Score: {this.props.scoreLeftTeam}{" "}
                      {this.state.fight === true
                        ? this.state.winnerScore == this.props.scoreLeftTeam
                          ? "Winner"
                          : "Looser"
                        : ""}
                    </p>
                  ) : null}
                  <ReactCSSTransitionGroup
                    transitionName="slideleft"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                  >
                    {this.props.leftTeam.map((item, index) => {
                      return (
                        <UserContainer
                          key={index}
                          imgProfile={item.gitData.avatar_url}
                          name={item.gitData.login}
                          team="left"
                          score={item.score}
                          fight={this.state.fight}
                        />
                      );
                    })}
                  </ReactCSSTransitionGroup>
                </div>
              ) : null}
            </div>
            {this.state.fight === false ? (
              <div className="group-battle-controler">
                <Tabs value={false}>
                  <Tab
                    label="fight"
                    onClick={() => {
                      this.setState({ fight: !this.state.fight });
                      this.calculateWinner();
                    }}
                  ></Tab>
                  <Tab label="save data" onClick={() => this.save_datas()} />
                </Tabs>
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={2000}
                  transitionLeaveTimeout={1000}
                  transitionAppear={true}
                  transitionAppearTimeout={1000}
                >
                  <AddUser></AddUser>
                </ReactCSSTransitionGroup>
              </div>
            ) : (
              <Tabs value={false}>
                <Tab
                  label="Add new player/s"
                  onClick={() => {
                    this.setState({ fight: !this.state.fight });
                  }}
                ></Tab>

                <Tab
                  label="See statistics"
                  onClick={() => {
                    this.setState({ statistics: true });
                  }}
                />
              </Tabs>
            )}
            <div
              className={`group-list-container ${
                this.state.fight === true
                  ? this.state.winnerScore === this.props.scoreRightTeamL
                    ? "winner"
                    : "looser"
                  : ""
              }`}
            >
              {this.props.rightTeam.length > 0 ? (
                <div className="group-users-zone">
                  {this.state.fight === true ? (
                    <p>
                      Total Score: {this.props.scoreRightTeamL}{" "}
                      {this.state.fight === true
                        ? this.state.winnerScore === this.props.scoreRightTeamL
                          ? "Winner"
                          : "Looser"
                        : ""}
                    </p>
                  ) : null}

                  <ReactCSSTransitionGroup
                    transitionName="slideright"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                  >
                    {this.props.rightTeam.map((item, index) => {
                      return (
                        <UserContainer
                          key={index}
                          imgProfile={item.gitData.avatar_url}
                          name={item.gitData.login}
                          team="right"
                          score={item.score}
                          fight={this.state.fight}
                        />
                      );
                    })}
                  </ReactCSSTransitionGroup>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="navigationLink group-navigation">
            <Tab
              label="back to fight"
              onClick={() => this.setState({ statistics: false })}
            ></Tab>
            <Statistics />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leftTeam: state.group.leftTeam,
    rightTeam: state.group.rightTeam,
    scoreLeftTeam: state.group.scoreLeftTeam,
    scoreRightTeamL: state.group.scoreRightTeamL,
    winnerScore: state.group.winnerScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeam: (leftList, rightList) => {
      dispatch({
        type: actionTypes.SET_TEAM,
        leftList: leftList,
        rightList: rightList,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
