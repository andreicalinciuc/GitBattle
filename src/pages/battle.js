import React from "react";
import SearchUser from "../components/Battle/selectUser";
import { Tab, Tabs } from "@material-ui/core";
import api from "../utility/api";
import BattleResult from "../components/Battle/battleListItem";
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicFormSerial: [("", 1), ("", 2)],
      dynamicFormData: [],
      dyanicDataFromFetch: null,
    };
  }

  onAddFormButtonClick = () => {
    const { dynamicFormSerial } = this.state;
    let tempDynamicSerial = dynamicFormSerial;
    let lastFormSerial = tempDynamicSerial.length + 1;
    tempDynamicSerial = [...tempDynamicSerial, lastFormSerial];
    this.setState({ dynamicFormSerial: tempDynamicSerial });
  };
  onRemoveFormButtonClick = () => {
    const { dynamicFormSerial, dynamicFormData } = this.state;
    let tempDynamicSerial = dynamicFormSerial;
    let tempDynamicData = dynamicFormData;
    tempDynamicSerial.pop();
    tempDynamicData.pop();
    this.setState({
      dynamicFormSerial: tempDynamicSerial,
      dynamicFormData: tempDynamicData,
    });
  };

  onChangeComponentData = (data) => {
    const { dynamicFormData } = this.state;
    let tempDynamicComponentData = dynamicFormData;
    let removeItem = null;
    tempDynamicComponentData.map((item, index) => {
      if (item.formSerial === data.formSerial) {
        removeItem = item;
      }
    });
    removeItem !== null &&
      tempDynamicComponentData.splice(
        tempDynamicComponentData.indexOf(removeItem),
        1
      );
    tempDynamicComponentData.push(data);
    this.setState({ dynamicFormData: tempDynamicComponentData });
  };

  removeFormButtonClick = (removeFormSerial) => {
    const { dynamicFormSerial, dynamicFormData } = this.state;
    let tempDynamicSerial = dynamicFormSerial;
    let tempDynamicComponentData = dynamicFormData;
    let removeIndex = null;
    dynamicFormData.map((item, index) => {
      if (item.formSerial === removeFormSerial) {
        removeIndex = index;
      }
    });

    tempDynamicComponentData.splice(
      tempDynamicComponentData.indexOf(removeIndex),
      1
    );

    tempDynamicSerial.splice(tempDynamicSerial.indexOf(removeFormSerial), 1);

    this.setState({
      dynamicFormSerial: tempDynamicSerial,
      dynamicFormData: tempDynamicComponentData,
    });
  };

  onSaveComponentData = async (data) => {
    const { dynamicFormData } = this.state;
    var response = await api.battle(dynamicFormData);
    this.setState({
      saveComponentData: dynamicFormData,
      dyanicDataFromFetch: response,
      dynamicComponentData: [],
      dynamicFormSerial: [],
    });
  };
  
  reset =  () => {
    this.setState({
      dynamicFormSerial: [("", 1), ("", 2)],
      dynamicFormData: [],
      dyanicDataFromFetch: null,
    });
  };


  render() {
    return (
      <div>
        <div className="battle-controller">
          <p>Find your fighters</p>
          {this.state.dyanicDataFromFetch == null? <Tabs>
            <Tab onClick={this.onAddFormButtonClick} label="+" />

            <Tab onClick={this.onRemoveFormButtonClick} label="-" />
          </Tabs>:<Tab onClick={() => this.reset()} label="Reset" />}
         
          <Tab onClick={() => this.onSaveComponentData()} label="Battle" />
        </div>

        <div className="users-search-section">
          {this.state.dyanicDataFromFetch != null
            ? this.state.dyanicDataFromFetch.map((item) => {
                return <BattleResult user={item} key={item.id} />;
              })
            : this.state.dynamicFormSerial.length >= 1 &&
              this.state.dynamicFormSerial.map((item) => {
                return (
                  <SearchUser
                    key={item}
                    {...this.props}
                    formSerial={item}
                    removeFormButtonClick={this.removeFormButtonClick}
                    onChangeComponentData={this.onChangeComponentData}
                    removeFormButtonClick={this.removeFormButtonClick}
                    fetchUser={this.fetchUser}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Battle;
