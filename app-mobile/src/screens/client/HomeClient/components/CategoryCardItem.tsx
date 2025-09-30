import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../../../types';
import { CategoryCard, CategoryIcon, CategoryName } from '../style';

interface CategoryCardItemProps {
    item: Category;
    onPress: (item: Category) => void;
}

export const CategoryCardItem = React.memo(({ item, onPress }: CategoryCardItemProps) => {
    return (
        <CategoryCard
            color={item.color}
            onPress={() => onPress(item)}
            activeOpacity={0.8}
        >
            <CategoryIcon color={item.color}>
                <Ionicons name={item.icon} size={24} color="#FFF" />
            </CategoryIcon>
            <CategoryName>{item.name}</CategoryName>
        </CategoryCard>
    );
});