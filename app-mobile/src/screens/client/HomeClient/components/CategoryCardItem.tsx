import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../../../../types";
import { CategoryCard, CategoryIcon, CategoryName } from "../style";

interface CategoryCardItemProps {
  item: Category;
  onPress: (item: Category) => void;
}

export const CategoryCardItem = React.memo(
  ({ item, onPress }: CategoryCardItemProps) => {
    return (
      <CategoryCard onPress={() => onPress(item)} activeOpacity={0.8}>
        <CategoryIcon>
          <Ionicons name={item.icon as any} size={24} color="#4B5563" />
        </CategoryIcon>
        <CategoryName>{item.name}</CategoryName>
      </CategoryCard>
    );
  }
);