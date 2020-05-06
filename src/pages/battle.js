import React from "react";
import SearchUser from "../components/Battle/selectUser";
import { Tab, Tabs } from "@material-ui/core";
import api from "../utility/api";
import BattleResult from "../components/Battle/battleListItem";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
class Battle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="battle-controller">
          <p>Find your fighters</p>
          {this.props.dyanicDataFromFetch.length !==
          this.props.dynamicFormSerial.length ? (
            <Tabs value={false}>
              <Tab onClick={this.props.onAddFormButtonClick} label="+" />

              <Tab
                onClick={this.props.onRemoveFormButtonClick}
                label="-"
                disabled={this.props.dynamicFormSerial > 0}
              />
            </Tabs>
          ) : (
            <Tab onClick={() => this.props.reset()} label="Reset" />
          )}

          {/* <Tab
            onClick={() => this.props.onSaveComponentData()}
            label="Battle"
          /> */}
        </div>

        <div className="users-search-section">
          {this.props.dyanicDataFromFetch.length ===
          this.props.dynamicFormSerial.length
            ? this.props.dyanicDataFromFetch.map((item) => {
                return (
                  <BattleResult
                    user={item}
                    key={item.id}
                    winnerScore={this.props.winnerScore}
                  />
                );
              })
            : this.props.dynamicFormSerial.length >= 1 &&
              this.props.dynamicFormSerial.map((item) => {
                return (
                  <SearchUser
                    key={item}
                    formSerial={item}
                    length={this.props.dynamicFormSerial.length}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dynamicFormSerial: state.dynamicFormSerial,
    dynamicFormData: state.dynamicFormData,
    dyanicDataFromFetch: state.dyanicDataFromFetch,
    winnerScore: state.winnerScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFormButtonClick: () => {
      dispatch({ type: actionTypes.ADD_FORM });
    },

    onRemoveFormButtonClick: () => {
      dispatch({ type: actionTypes.REMOVE_FORM });
    },
    reset: () => {
      dispatch({ type: actionTypes.RESET });
    },
    // onSaveComponentData: async () => {
    //   dispatch({ type: actionTypes.BAT });
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
