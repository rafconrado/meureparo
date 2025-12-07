export interface PromoItem {
  id: number | string;
  title: string;
  description: string;
  discount: string;
  validUntil?: string;
  usageCount?: number;
  couponCode?: string;
  providerName?: string;
}

export interface PromoCardItemProps {
  item: PromoItem;
  onPress?: () => void;
}
