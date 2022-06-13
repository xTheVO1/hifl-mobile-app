import { Alert } from "react-native";

export const alertModal = (title, msg, callBack) => {
  return Alert.alert(title, msg, [{ text: "Okay", onPress: callBack ? callBack : null }], {
    cancelable: true,
    onDismiss: callBack ? callBack : null,
  });
};
