import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface CustomCarouselProps<T> {
  title: string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  scrollAnimationDuration?: number;
  style?: ViewStyle;
}
