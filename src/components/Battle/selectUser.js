import React, { PureComponent } from "react";
import "../Battle/battle.css";
import api from "../../utility/api";
import { Tab, Tabs, Input, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class SearchUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      score: 0,
      isLoading: true,
      inputData: {
        formSerial: null,
        value: null,
      },
    };
  }

  calculateScore(user) {
    var score = user.public_repos + user.followers + user.following;
    return score;
  }
  fetchUser = async (data) => {
    if (data != null) {
      this.setState({
        isLoading: false,
      });
      let respone = await api.fetchUser(data);
     if(respone!==undefined){
      let score = this.calculateScore(respone);
      this.setState({
        repo: respone,
        isLoading: true,
        score: score,
      });
      this.props.submitUser(respone, this.state.score);
    }
     }
      
  };
  resetUser = () => {
    this.setState({
      repo: null,
      inputData: {
        formSerial: null,
        value: null,
      },
    });
  };
  render() {
    const { formSerial } = this.props;
    return (
      <div className="user-container-search">
        {this.state.isLoading === true ? (
          this.state.repo != null ? (
            <div>
              {this.state.repo.message != null ? (
                <p className="error">{this.state.repo.message}!</p>
              ) : (
                <div className="user-find">
                  <img src={this.state.repo.avatar_url} width="80px"></img>
                  <p>@{this.state.repo.login}</p>
                </div>
              )}
            </div>
          ) : null
        ) : (
          <CircularProgress />
        )}
        <Input
          value={this.state.value}
          onChange={(e) => {
            this.setState({
              inputData: {
                formSerial: formSerial,
                value: e.target.value,
              },
            });
            this.state.inputData.value !== null &&
              this.props.onChangeComponentData({
                formSerial: formSerial,
                value: e.target.value,
              });
          }}
          placeholder={`User ${formSerial}`}
          type="text"
          id="name"
          inputRef={(el) => (this.name = el)}
        />
        <Tabs value={false}>
          {this.state.repo === null ? (
            <Tab
              onClick={() => this.fetchUser(this.state.inputData.value)}
              label="Submit"
            />
          ) : (
            <Tab
              onClick={() => {
                this.props.resetFetchUser(this.name.value);
                this.name.value = "";
                this.resetUser();
              }}
              label="Reset"
            />
          )}
          <Tab
            onClick={() =>
              this.props.removeFormButtonClick(
                formSerial,
                this.state.inputData.value
              )
            }
            label="Remove"
            disabled={this.props.length <= 1}
          />
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeComponentData: (data) => {
      dispatch({ type: actionTypes.MODIFY_CONTENT, data: data });
    },
    removeFormButtonClick: (formSerial, name) => {
      dispatch({
        type: actionTypes.REMOVE_FORM_CLICK,
        removeFormSerial: formSerial,
        name: name,
      });
    },

    submitUser: (user, score) => {
      dispatch({
        type: actionTypes.SUBMIT_FETCH_USER,
        user: user,
        score: score,
      });
    },
    resetFetchUser: (user) => {
      dispatch({ type: actionTypes.RESET_USER, user: user });
    },
  };
};
export default connect(null, mapDispatchToProps)(SearchUser);
