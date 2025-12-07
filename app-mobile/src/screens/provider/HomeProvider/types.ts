import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

export interface ServiceRequest {
  id: string;
  clientName: string;
  serviceType: string;
  distance: string;
  price: string;
  date: string;
}

export type HomeProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "HomeProvider"
>;
