import React from "react";
import api from "../utility/api";
import "../components/Group/group.css";
import { Tab } from "@material-ui/core";
import AddUser from '../components/Group/addUser'
class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftList: [],
      rightList: [],
    };
  }

  componentDidMount = async () => {
    var leftList = await api.getListByID(
      "af8e7eb3-8f6d-11ea-bd04-e70beb125682"
    );
    var rightList = await api.getListByID(
      "cd457331-8f8e-11ea-bd04-5f6877a3510f"
    );
    this.setState({
      leftList: leftList,
      rightList: rightList,
    });
  };

  render() {
    return (
      <div>
        <div className="group-list-section">
          <div className="group-list-container">
            {this.state.leftList.map((item) => {
              return <p> {item.name}</p>;
            })}
          </div>
          <div>
            <Tab label="battle"></Tab>
          <AddUser></AddUser>
            
          </div>
          <div className="group-list-container">
            {this.state.rightList.map((item) => {
              return <p> {item.name}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Group;
