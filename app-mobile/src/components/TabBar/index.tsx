import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

type TabItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type Props = {
  tabs: TabItem[];
  activeIndex: number;
};

export function TabBar({ tabs, activeIndex }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={tab.onPress}
          style={styles.tabButton}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={index === activeIndex ? "#57B2C5" : "#0C0C0C"}
            style={styles.icon}
          />
          <Text
            style={[
              styles.label,
              { color: index === activeIndex ? "#57B2C5" : "#0C0C0C" },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
