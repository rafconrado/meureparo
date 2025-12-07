import { StyleSheet } from "react-native";

const COLORS = {
  PRIMARY: "#DF692B",
  WHITE: "#FFF",
};

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});
