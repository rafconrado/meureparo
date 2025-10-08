import type { ImageSourcePropType } from "react-native";
import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

export type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface Provider {
  id: string;
  advertisementId?: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image: ImageSourcePropType;
  isVerified?: boolean;
  isPromoted?: boolean;
  discount?: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface Promo {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  providerName: string;
  couponCode?: string;
  colors?: readonly [string, string, ...string[]];
}

export interface Partner {
  id: number;
  name: string;
  logo: ImageSourcePropType;
}
