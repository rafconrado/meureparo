import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFF8EC",
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
    width: width,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginBottom: -2,
  },
  label: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
  },
});
