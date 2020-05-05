import api from "../utility/api";

const initialState = {
  dynamicFormSerial: [("", 1), ("", 2)],
  dynamicFormData: [],
  dyanicDataFromFetch: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_FORM") {
    const { dynamicFormSerial } = state;
    let tempDynamicSerial = dynamicFormSerial;
    let lastFormSerial = tempDynamicSerial.length + 1;
    tempDynamicSerial = [...tempDynamicSerial, lastFormSerial];
    console.log("ADD_FORM");
    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial,
    };
  }
  if (action.type === "REMOVE_FORM") {
    console.log("REMOVE_FORM");
    let tempDynamicSerial = state.dynamicFormSerial;
    let tempDynamicData = state.dynamicFormData;
    tempDynamicSerial.pop();
    tempDynamicData.pop();
    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial,
      dynamicFormData: tempDynamicData,
    };
  }
  if (action.type === "MODIFY_CONTENT") {
    const { dynamicFormData } = state;
    let tempDynamicComponentData = dynamicFormData;
    let removeItem = null;
    tempDynamicComponentData.map((item, index) => {
      if (item.formSerial === action.data.formSerial) {
        removeItem = item;
      }
    });
    removeItem !== null &&
      tempDynamicComponentData.splice(
        tempDynamicComponentData.indexOf(removeItem),
        1
      );
    tempDynamicComponentData.push(action.data);
    return { ...state, dynamicFormData: tempDynamicComponentData };
  }
  if (action.type === "REMOVE_FORM_CLICK") {
    const { dynamicFormSerial, dynamicFormData } = state;
    let tempDynamicSerial = dynamicFormSerial;
    let tempDynamicComponentData = dynamicFormData;
    let removeIndex = null;
    dynamicFormData.map((item, index) => {
      if (item.formSerial === action.removeFormSerial) {
        removeIndex = index;
      }
    });

    tempDynamicComponentData.splice(
      tempDynamicComponentData.indexOf(removeIndex),
      1
    );

    tempDynamicSerial.splice(
      tempDynamicSerial.indexOf(action.removeFormSerial),
      1
    );

    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial,
      dynamicFormData: tempDynamicComponentData,
    };
  }
  if (action.type === "RESET") {
    return {
      ...state,
      dynamicFormSerial: [("", 1), ("", 2)],
      dynamicFormData: [],
      dyanicDataFromFetch: null,
    };
  }
  if (action.type === "BATTLE") {
    async function fetchUser () {
        const { dynamicFormData } = state;
        var response = await api.battle(state.dynamicFormData);
        return {
          ...state,
          saveComponentData: dynamicFormData,
          dyanicDataFromFetch: response,
          dynamicComponentData: [],
          dynamicFormSerial: [],
        };
      }
      return fetchUser();
    
   
  }

  return state;
};

export default reducer;
