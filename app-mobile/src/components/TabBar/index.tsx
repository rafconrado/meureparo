import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { TabBarProps } from "./types";
import { Container, TabButton, Icon, Label } from "./styles";

const ACTIVE_COLOR = "#57B2C5";
const INACTIVE_COLOR = "#0C0C0C";
const ICON_SIZE = 24;

export function TabBar({ tabs, activeIndex }: TabBarProps) {
  return (
    <Container>
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        const iconColor = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <TabButton
            key={`${tab.label}-${index}`}
            onPress={tab.onPress}
            activeOpacity={0.7}
          >
            <Icon>
              <Ionicons name={tab.icon} size={ICON_SIZE} color={iconColor} />
            </Icon>
            <Label isActive={isActive}>{tab.label}</Label>
          </TabButton>
        );
      })}
    </Container>
  );
}
