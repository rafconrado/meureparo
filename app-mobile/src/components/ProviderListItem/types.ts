import { GestureResponderEvent } from "react-native";
import { Provider } from "../../types";

export interface ProviderListItemProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (provider: Provider) => void;
}

export interface RatingProps {
  rating?: number;
  reviews?: number;
}
