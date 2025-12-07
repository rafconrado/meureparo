import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

export type ProfileProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "ProfileProvider" // Certifique-se de que esse nome está no seu navigation.d.ts
>;


export interface ProfileUpdateData {
  name: string;
  email: string;
}