import React from "react";
import api from "../utility/api";
import "../components/Group/group.css";
import { Tab, Tabs } from "@material-ui/core";
import AddUser from "../components/Group/addUser";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";
import UserContainer from "../components/Group/userGroupContainer";
class Group extends React.Component {
  constructor(props) {
    super(props);
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
    await api.saveList("af8e7eb3-8f6d-11ea-bd04-e70beb125682", {
      "users": this.props.leftTeam,
    });
    await api.saveList("cd457331-8f8e-11ea-bd04-5f6877a3510f", {
      "users": this.props.rightTeam,
    });
  };

  render() {
    return (
      <div>
        <div className="group-list-section">
          <div className="group-list-container">
            {this.props.leftTeam.length > 0 ? (
              <div className="group-users-zone">
                <p>Total Score: {this.props.scoreLeftTeam}</p>
                {this.props.leftTeam.map((item, index) => {
                  return (
                    <UserContainer
                      key={index}
                      imgProfile={item.gitData.avatar_url}
                      name={item.gitData.login}
                      team="left"
                      score={item.score}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
          <div class="group-battle-controler">
            <Tabs value={false}>
              <Tab label="fight"></Tab>
              <Tab label="save data" onClick={() => this.save_datas()} />
            </Tabs>
            <AddUser></AddUser>
          </div>
          <div className="group-list-container">
            {this.props.rightTeam.length > 0 ? (
              <div className="group-users-zone">
                <p>Total Score: {this.props.scoreRightTeamL}</p>
                {this.props.rightTeam.map((item, index) => {
                  console.log(item);
                  return (
                    <UserContainer
                      key={index}
                      imgProfile={item.gitData.avatar_url}
                      name={item.gitData.login}
                      team="right"
                      score={item.score}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
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
