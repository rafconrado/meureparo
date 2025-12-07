import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../../@types/navigation";
import { Provider } from "../../../types";

export type CategoryScreenProps = NativeStackScreenProps<
  ClientStackParamList,
  "CategoryScreen"
>;

export interface CategoryScreenState {
  providers: Provider[];
  isLoading: boolean;
  error: string | null;
}
