import { Provider } from "../../types";

export interface FeaturedProviderCardProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
}

export interface ProviderBadgeProps {
  provider: Provider;
}
