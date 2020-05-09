import React, { PureComponent } from "react";
import "../Group/addUser";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
class UserContainer extends PureComponent {
  render() {
    return (
      <div className="user-team-container">
        <img src={this.props.imgProfile} width="35px" height="35px"></img>
        <p>{this.props.name}</p>
        {this.props.fight === true ? (
          <p>Score: {this.props.score}</p>
        ) : (
          <RestoreFromTrashIcon
            onClick={() => {
              this.props.removeUser(this.props.name, this.props.team);
            }}
          />
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (name, team) => {
      dispatch({
        type: actionTypes.REMOVE_USER,
        name: name,
        team: team,
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(UserContainer);
