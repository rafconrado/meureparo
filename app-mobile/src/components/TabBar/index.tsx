import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#FFF8EC", 
        borderTopWidth: 1,
        borderColor: "#D9D9D9",
      }}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={tab.onPress}
          style={{ alignItems: "center" }}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={index === activeIndex ? "#57B2C5" : "#0C0C0C"}
          />
          <Text
            style={{
              fontSize: 12,
              color: index === activeIndex ? "#57B2C5" : "#0C0C0C",
              fontFamily: "Inter-Bold",
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
