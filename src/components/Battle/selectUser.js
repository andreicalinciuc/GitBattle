import React, { PureComponent } from "react";
import "../Battle/battle.css";
import api from "../../utility/api";
import { BoxLoading } from "react-loadingg";

export default class SearchUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      isLoading: false,
    };
  }
  fetchUser = async (data) => {
    if (data != null) {
      this.setState({
        isLoading: false,
      });
      var respone = await api.battle(data.value);
      console.log(respone);
      this.setState({
        repo: respone,
        isLoading: true,
      });
    }
  };
  render() {
    const {
      onChangeComponentData,
      removeFormButtonClick,
      formSerial,
    } = this.props;
    let inputData;
    return (
      <div className="user-container-search">
        {this.state.repo != null ? (
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
        ) : null}
        <input
          onChange={(e) => {
            inputData = {
              formSerial: formSerial,
              value: e.target.value,
              repo: this.state.repo,
            };
            onChangeComponentData(inputData);
          }}
          placeholder={`User ${formSerial}`}
          type="text"
        />
        <div>
          <button onClick={() => this.fetchUser(inputData)} type="button">
            Submit
          </button>
          <button
            onClick={() => removeFormButtonClick(formSerial)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
