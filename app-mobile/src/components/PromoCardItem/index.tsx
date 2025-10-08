import React from "react";
import { TouchableOpacity } from "react-native";
import {
  PromoCard,
  PromoContent,
  PromoInfo,
  PromoTitle,
  PromoDescription,
  PromoMeta,
  PromoDiscount,
  PromoCoupon,
  CouponIcon,
  CouponCode,
} from "./style";

interface PromoCardItemProps {
  item: {
    id: number | string;
    title: string;
    description: string;
    discount: string;
    validUntil?: string;
    usageCount?: number;
    couponCode?: string;
    providerName?: string;
  };
  onPress?: () => void;
}

export const PromoCardItem: React.FC<PromoCardItemProps> = ({
  item,
  onPress,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    
    return `${day}/${month}`;
  };

  const getMetaText = () => {
    const parts = [];
    
    if (item.validUntil) {
      parts.push(`Até ${formatDate(item.validUntil)}`);
    }
    
    if (item.providerName) {
      parts.push(item.providerName);
    }
    
    return parts.join(" • ");
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      onPress={onPress}
      style={{ marginRight: 16 }}
    >
      <PromoCard
        colors={["#FF8724", "#FF6B2C", "#FF4D1C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <PromoContent>
          <PromoInfo>
            <PromoTitle>{item.title}</PromoTitle>
            <PromoDescription numberOfLines={2}>
              {item.description}
            </PromoDescription>
            
            {item.couponCode && (
              <PromoCoupon>
                <CouponIcon>🎟️</CouponIcon>
                <CouponCode>{item.couponCode}</CouponCode>
              </PromoCoupon>
            )}
            
            {getMetaText() && (
              <PromoMeta>{getMetaText()}</PromoMeta>
            )}
          </PromoInfo>

          <PromoDiscount>{item.discount}</PromoDiscount>
        </PromoContent>
      </PromoCard>
    </TouchableOpacity>
  );
};

export default PromoCardItem;