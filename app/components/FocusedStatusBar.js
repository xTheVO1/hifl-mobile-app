import { StatusBar, Text } from "react-native";
import { useIsFocused } from "@react-navigation/core";

const FocusedStatusBar = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar animated={false} {...props} /> : null;
};

export default FocusedStatusBar;
