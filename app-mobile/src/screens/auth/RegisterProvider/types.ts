import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Importe a lista de rotas global (onde você definiu RegisterProviderStep2)
import { ProviderStackParamList } from "../../../@types/navigation"; 

export type RegisterProviderStep1NavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "RegisterProviderStep1"
>;