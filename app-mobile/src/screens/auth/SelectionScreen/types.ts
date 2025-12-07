import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ClientStackParamList,
  ProviderStackParamList,
} from "../../../@types/navigation";

type CombinedParamList = ClientStackParamList & ProviderStackParamList;

export type SelectionScreenNavigationProp =
  NativeStackNavigationProp<CombinedParamList>;
