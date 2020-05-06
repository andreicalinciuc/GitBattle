import React, { PureComponent } from "react";
import "../Battle/battle.css";
import { Tab, Tabs, Input, CircularProgress , } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import api from "../../utility/api";
import "../Group/group.css";
class AddUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      isLoading: true,
      inputData: {
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
            <div>
                <ArrowBackIcon/>
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
                  <ArrowForwardIcon/>
            </div>
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
          placeholder="Find your player"
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

export default AddUser;
