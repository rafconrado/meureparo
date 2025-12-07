import { ImageSourcePropType } from "react-native";

export interface Partner {
  id: string;
  name: string;
  logo: ImageSourcePropType;
}

export interface PartnerItemProps {
  partner: Partner;
  onPress?: (partner: Partner) => void;
}
