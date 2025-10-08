import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../../types/index";
import { CategoryCard, CategoryIcon, CategoryName } from "./style";

interface CategoryCardItemProps {
  item: Category;
  onPress: (item: Category) => void;
}

export const CategoryCardItem = React.memo(
  ({ item, onPress }: CategoryCardItemProps) => {
    return (
      <CategoryCard onPress={() => onPress(item)} activeOpacity={0.7}>
        <CategoryIcon style={{ backgroundColor: `${item.color}15` }}>
          <Ionicons name={item.icon as any} size={28} color={item.color} />
        </CategoryIcon>
        <CategoryName numberOfLines={2}>{item.name}</CategoryName>
      </CategoryCard>
    );
  }
);
