import React from "react";
import SearchUser from "../components/Battle/selectUser";
import { Tab, Tabs } from "@material-ui/core";
import BattleResult from "../components/Battle/battleListItem";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Battle extends React.Component {
  render() {
    return (
      <div>
        <div className="battle-controller">
          <p>Find your fighters</p>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={1000}
          >
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
          </ReactCSSTransitionGroup>
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
    dynamicFormSerial: state.battle.dynamicFormSerial,
    dynamicFormData: state.battle.dynamicFormData,
    dyanicDataFromFetch: state.battle.dyanicDataFromFetch,
    winnerScore: state.battle.winnerScore,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
