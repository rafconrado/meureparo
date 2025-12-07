import { StyleProp, ViewStyle } from "react-native";

export interface LogoutButtonProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  userType?: "client" | "provider";
  onLogoutSuccess?: () => void;
  onLogoutError?: (error: Error) => void;
}
