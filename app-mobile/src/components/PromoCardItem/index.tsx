import React from "react";
import { TouchableOpacity } from "react-native";

import { PromoCardItemProps } from "./types";
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
} from "./styles";

const GRADIENT_COLORS = ["#FF8724", "#FF6B2C", "#FF4D1C"] as const;
const GRADIENT_START = { x: 0, y: 0 } as const;
const GRADIENT_END = { x: 1, y: 1 } as const;

export const PromoCardItem = ({ item, onPress }: PromoCardItemProps) => {
  const formatDate = (dateString?: string): string | null => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${day}/${month}`;
  };

  const getMetaText = (): string => {
    const parts: string[] = [];

    if (item.validUntil) {
      const formattedDate = formatDate(item.validUntil);
      if (formattedDate) {
        parts.push(`Até ${formattedDate}`);
      }
    }

    if (item.providerName) {
      parts.push(item.providerName);
    }

    return parts.join(" • ");
  };

  const metaText = getMetaText();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{ marginRight: 16 }}
    >
      <PromoCard
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
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

            {metaText && <PromoMeta>{metaText}</PromoMeta>}
          </PromoInfo>

          <PromoDiscount>{item.discount}</PromoDiscount>
        </PromoContent>
      </PromoCard>
    </TouchableOpacity>
  );
};
