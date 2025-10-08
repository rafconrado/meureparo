import React from "react";
import { Promo } from "../../types";

import {
  PromoCard,
  PromoContent,
  PromoInfo,
  PromoTitle,
  PromoDescription,
  PromoMeta,
  PromoDiscount,
} from "./style";

interface PromoCardItemProps {
  item: Promo;
}

export const PromoCardItem = React.memo(({ item }: PromoCardItemProps) => {
  const cardColors = item.colors || (["#f38721", "#284cc4"] as const);

  return (
    <PromoCard colors={cardColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <PromoContent>
        <PromoInfo>
          <PromoTitle>{item.title}</PromoTitle>
          <PromoDescription>{item.description}</PromoDescription>
          <PromoMeta>
            {item.providerName} • Até {item.validUntil}
          </PromoMeta>
        </PromoInfo>

        {item.discount && <PromoDiscount>{item.discount}</PromoDiscount>}
      </PromoContent>
    </PromoCard>
  );
});
