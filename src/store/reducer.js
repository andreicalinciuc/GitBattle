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
    console.log(tempDynamicSerial[tempDynamicSerial.length-1])
    let lastFormSerial = tempDynamicSerial[tempDynamicSerial.length-1] + 1;
    tempDynamicSerial = [...tempDynamicSerial, lastFormSerial];
    console.log("ADD_FORM");
    return {
      ...state,
      dynamicFormSerial: tempDynamicSerial.concat(),
    };
  }
  if (action.type === "REMOVE_FORM") {
    console.log("REMOVE_FORM");
    const { dynamicFormData, dynamicFormSerial } = state;

    return {
      ...state,
      dynamicFormSerial: dynamicFormSerial.slice(0, -1),
      dynamicFormData: dynamicFormData.slice(0, -1),
    };
  }
  if (action.type === "MODIFY_CONTENT") {
    const { dynamicFormData } = state;
    let removeItem = null;
    console.log(dynamicFormData);
    dynamicFormData.map((item, index) => {
      if (item.formSerial === action.data.formSerial) {
        removeItem = item;
      }
    });
    removeItem !== null &&
      dynamicFormData.splice(dynamicFormData.indexOf(removeItem), 1);
    dynamicFormData.push(action.data);
    console.log(dynamicFormData);
    return { ...state, dynamicFormData: dynamicFormData.concat() };
  }

  if (action.type === "REMOVE_FORM_CLICK") {
    console.log("REMOVE_FORM_CLICK");
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
      dynamicFormSerial: tempDynamicSerial.concat(),
      dynamicFormData: tempDynamicComponentData.concat(),
    };
  }
  if (action.type === "RESET") {
    console.log("RESET");

    return {
      ...state,
      dynamicFormSerial: [("", 1), ("", 2)].concat(),
      dynamicFormData: [],
      dyanicDataFromFetch: null,
    };
  }
  if (action.type === "BATTLE") {
    console.log("BATTLE");

    async function fetchUser() {
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
