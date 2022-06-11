import { Alert } from "react-native";

export const alertModal = (title, msg) => {
  return Alert.alert(title, msg, [{ text: "Okay" }], {
    cancelable: true,
  });
};
