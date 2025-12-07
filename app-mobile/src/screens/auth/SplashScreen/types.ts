import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../@types/navigation"; // Importe a lista que editamos acima

export type SplashScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Splash"
>;
