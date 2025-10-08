import React from "react";
import { Partner } from "../../types";
import { PartnerContainer, PartnerLogo, PartnerName } from "./style";

interface PartnerItemProps {
  partner: Partner;
}

export const PartnerItem = React.memo(({ partner }: PartnerItemProps) => {
  return (
    <PartnerContainer>
      <PartnerLogo source={partner.logo} resizeMode="contain" />
      <PartnerName>{partner.name}</PartnerName>
    </PartnerContainer>
  );
});
