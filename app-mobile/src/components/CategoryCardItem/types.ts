export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryCardItemProps {
  item: Category;
  onPress: (item: Category) => void;
}
