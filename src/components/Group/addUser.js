import React, { PureComponent } from "react";
import "../Battle/battle.css";
import { Tab, Tabs, Input, CircularProgress } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import api from "../../utility/api";
import "../Group/group.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class AddUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      isLoading: true,
      inputData: {
        value: null,
      },
      score: 0,
    };
  }
  calculateScore = (user) => {
    var score = user.public_repos + user.followers + user.following;
    return score;
  };
  fetchUser = async (data) => {
    if (data != null) {
      this.setState({
        isLoading: false,
      });
      var respone = await api.fetchUser(data);
      if (respone !== undefined) {
        let score = this.calculateScore(respone);
        this.setState({
          repo: respone,
          isLoading: true,
          score: score,
        });
      }
    }
  };

  resetUser = () => {
    this.setState({
      repo: null,
      isLoading: true,
      inputData: {
        value: null,
      },
    });
  };
  render() {
    return (
      <div className="user-container-search">
        {this.state.isLoading == true ? (
          this.state.repo != null ? (
            this.state.repo.message != null ? (
              <p className="error">{this.state.repo.message}!</p>
            ) : (
              <div className="select-team-section">
                <ArrowBackIcon
                  onClick={() => {
                    this.props.addTeam(
                      {
                        name: this.state.repo.login,
                        gitData: this.state.repo,
                        score: this.state.score,
                      },
                      "left",
                      this.state.score
                    );
                  }}
                />
                <div>
                  <div className="user-find">
                    <img src={this.state.repo.avatar_url} width="80px"></img>
                    <p>@{this.state.repo.login}</p>
                  </div>
                </div>
                <ArrowForwardIcon
                  onClick={() => {
                    this.props.addTeam(
                      {
                        name: this.state.repo.login,
                        gitData: this.state.repo,
                        score: this.state.score,
                      },
                      "right",
                      this.state.score
                    );
                  }}
                />
              </div>
            )
          ) : null
        ) : (
          <CircularProgress />
        )}
        <Input
          onChange={(e) => {
            this.setState({
              inputData: {
                value: e.target.value,
              },
            });
          }}
          type="text"
          id="name"
          inputRef={(el) => (this.name = el)}
          placeholder="Find your fighter"
        />
        <Tabs value={false}>
          {this.state.repo == null ? (
            <Tab
              onClick={() => this.fetchUser(this.state.inputData.value)}
              label="Submit"
            />
          ) : (
            <Tab
              onClick={() => {
                this.name.value = "";
                this.resetUser();
              }}
              label="Reset"
            />
          )}
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTeam: (user, team, score) => {
      dispatch({
        type: actionTypes.ADD_TEAM,
        user: user,
        team: team,
        score: score,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
