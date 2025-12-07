import { Ionicons } from "@expo/vector-icons";

export interface TabItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeIndex: number;
}
