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
    };
  }
  fetchUser = async (data) => {
    if (data != null) {
      this.setState({
        isLoading: false,
      });
      var respone = await api.fetchUser(data.value);
      this.setState({
        repo: respone,
        isLoading: true,
      });
    }
  };
  resetUser = () => {
    this.setState({
      repo: null,
    });
  };
  render() {
    const {
      formSerial,
    } = this.props;
    let inputData;
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
          onChange={(e) => {
            inputData = {
              formSerial: formSerial,
              value: e.target.value,
            };

            this.props.onChangeComponentData(inputData);
          }}
          placeholder={`User ${formSerial}`}
          type="text"
        />
        <Tabs>
          {this.state.repo == null ? (
            <Tab
              onClick={() => this.fetchUser(inputData)}
              label="Submit"
              key="0"
            />
          ) : (
            <Tab onClick={() => this.resetUser()} label="Reset" key="1" />
          )}
          <Tab
            onClick={() => this.props.removeFormButtonClick(formSerial)}
            label="Remove"
            key="2"
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
  };
};
export default connect(null, mapDispatchToProps)(SearchUser);
