import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

export type RegisterProviderStep2Props = NativeStackScreenProps<
  ProviderStackParamList,
  "RegisterProviderStep2"
>;

export type RegisterProviderStep2RouteProp =
  RegisterProviderStep2Props["route"];
