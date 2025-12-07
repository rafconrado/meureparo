import { Feather } from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native";

export interface ProviderHeaderProps {
  onActionPress?: (event: GestureResponderEvent) => void;
  actionIcon?: keyof typeof Feather.glyphMap;
  defaultAvatarUrl?: string;
}
