import React from "react";
import SearchUser from "../components/Battle/selectUser";
import { Tab, Tabs } from "@material-ui/core";
import api from "../utility/api";
import BattleResult from "../components/Battle/battleListItem";
import { connect } from "react-redux";
class Battle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {}

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

          <Tab
            onClick={() => this.props.onSaveComponentData()}
            label="Battle"
          />
        </div>

        <div className="users-search-section">
          {this.props.dyanicDataFromFetch.length ===
          this.props.dynamicFormSerial.length
            ? this.props.dyanicDataFromFetch.map((item) => {
                return <BattleResult user={item} key={item.id} />;
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFormButtonClick: () => {
      dispatch({ type: "ADD_FORM" });
    },

    onRemoveFormButtonClick: () => {
      dispatch({ type: "REMOVE_FORM" });
    },
    reset: () => {
      dispatch({ type: "RESET" });
    },
    onSaveComponentData: async () => {
      dispatch({ type: "BATTLE" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
