import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { CategoryCardItemProps } from "./types";
import { CategoryCard, CategoryIcon, CategoryName } from "./styles";

export const CategoryCardItem = React.memo(
  ({ item, onPress }: CategoryCardItemProps) => {
    const handlePress = () => {
      onPress(item);
    };

    const iconBackgroundColor = `${item.color}15`;

    return (
      <CategoryCard onPress={handlePress} activeOpacity={0.7}>
        <CategoryIcon style={{ backgroundColor: iconBackgroundColor }}>
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={32}
            color={item.color}
          />
        </CategoryIcon>
        <CategoryName numberOfLines={2}>{item.name}</CategoryName>
      </CategoryCard>
    );
  }
);
