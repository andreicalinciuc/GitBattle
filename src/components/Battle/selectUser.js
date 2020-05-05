import React, { PureComponent } from "react";
import "../Battle/battle.css";
import api from "../../utility/api";
import { Tab, Tabs, Input, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

class SearchUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      isLoading: true,
      inputData: {
        formSerial: null,
        value: null,
      },
    };
  }
  fetchUser = async (data) => {
    if (data != null) {
      this.setState({
        isLoading: false,
      });
      var respone = await api.fetchUser(data);
      this.setState({
        repo: respone,
        isLoading: true,
      });

      this.props.submitUser(respone);
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
        {this.state.isLoading == true ? (
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
          key="3"
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
                this.resetUser();
                this.props.resetUser(this.state.inputData.removeFormSerial);
              }}
              label="Reset"
              key="1"
            />
          )}
          <Tab
            onClick={() => this.props.removeFormButtonClick(formSerial)}
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
      dispatch({ type: "MODIFY_CONTENT", data: data });
    },
    removeFormButtonClick: (formSerial) => {
      dispatch({ type: "REMOVE_FORM_CLICK", removeFormSerial: formSerial });
    },

    submitUser: (user) => {
      dispatch({ type: "SUBMIT_FETCH_USER", user: user });
    },
  };
};
export default connect(null, mapDispatchToProps)(SearchUser);
