import api from "../utility/api";

const initialState = {
  dynamicFormSerial: [("", 1), ("", 2)],
  dynamicFormData: [],
  dyanicDataFromFetch: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_FORM") {
    console.log("ADD_FORM");
    const { dynamicFormSerial } = state;
    let tempDynamicSerial = dynamicFormSerial;
    let lastFormSerial = tempDynamicSerial[tempDynamicSerial.length - 1] + 1;
    tempDynamicSerial = [...tempDynamicSerial, lastFormSerial];
    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial.concat(),
    };
  }
  if (action.type === "REMOVE_FORM") {
    console.log("REMOVE_FORM");
    const { dynamicFormData, dynamicFormSerial, dyanicDataFromFetch } = state;

    return {
      ...state,
      dynamicFormSerial: dynamicFormSerial.slice(0, -1),
      dynamicFormData: dynamicFormData.slice(0, -1),
      dyanicDataFromFetch: dyanicDataFromFetch.slice(0, -1),
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
    return {
      ...state,
      dynamicFormData: tempDynamicComponentData.concat(),
    };
  }

  if (action.type === "REMOVE_FORM_CLICK") {
    console.log("REMOVE_FORM_CLICK");
    const { dynamicFormSerial, dynamicFormData, dyanicDataFromFetch } = state;
    let tempDynamicSerial = dynamicFormSerial;
    let tempDynamicComponentData = dynamicFormData;
    let tempDynamicFetchData = dyanicDataFromFetch;
    let removeIndex = null;
    dynamicFormData.map((item, index) => {
      if (item.formSerial === action.removeFormSerial) {
        removeIndex = index;
      }
    });
    tempDynamicComponentData.splice(removeIndex, 1);
    tempDynamicFetchData.splice(removeIndex, 1);

    tempDynamicSerial.splice(removeIndex, 1);
    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial.concat(),
      dynamicFormData: tempDynamicComponentData.concat(),
      dyanicDataFromFetch: tempDynamicFetchData.concat(),
    };
  }

  if (action.type === "RESET") {
    console.log("RESET");
    return {
      ...state,
      dynamicFormSerial: [("", 1), ("", 2)].concat(),
      dynamicFormData: [].concat(),
      dyanicDataFromFetch: [].concat(),
    };
  }
  if (action.type === "SUBMIT_FETCH_USER") {
    const { dyanicDataFromFetch } = state;
    let tempDynamicFetchUser = dyanicDataFromFetch;
    tempDynamicFetchUser.push(action.user);

    return {
      ...state,
      dyanicDataFromFetch: tempDynamicFetchUser.concat(),
    };
  }

  return state;
};

export default reducer;
