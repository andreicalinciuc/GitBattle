import React from "react";
import SearchUser from "../components/Battle/selectUser";
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicFormSerial: [("", 1), ("", 2)],
      dynamicFormData: [],
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
    const { dynamicFormSerial } = this.state;
    let tempDynamicSerial = dynamicFormSerial;
    let lastFormSerial = tempDynamicSerial.length - 1;
    tempDynamicSerial.splice(
      tempDynamicSerial.indexOf(dynamicFormSerial.length),
      1
    );
    this.setState({ dynamicFormSerial: tempDynamicSerial });
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

  onSaveComponentData = (data) => {
    const { dynamicFormData } = this.state;
    this.setState({
      saveComponentData: dynamicFormData,
      dynamicComponentData: [],
      dynamicFormSerial: [],
    });
    console.log(this.state.dynamicFormData);
  };

  render() {
    return (
      <div>
        <div>
          <p>Find your firends</p>
          <div className={"add-form-button"}>
            <button onClick={this.onAddFormButtonClick} type="submit">
              +
            </button>
            <button onClick={this.onRemoveFormButtonClick} type="submit">
              -
            </button>
          </div>
        </div>
        <button type="button" onClick={() => this.onSaveComponentData()}>
          Battle
        </button>
        <div className="users-search-section">
          {this.state.dynamicFormSerial.length >= 1 &&
            this.state.dynamicFormSerial.map((item, index) => {
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
        <div className="list-users">
          {console.log(this.state.dynamicFormFetch)}
        </div>
      </div>
    );
  }
}

export default Battle;
