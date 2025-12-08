import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

/**
 * Define o tipo de transação financeira.
 * 'income' = Recebimento de serviço (Verde)
 * 'outcome' = Taxa da plataforma ou Saque (Vermelho)
 */
export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: "income" | "outcome";
  category: string; // Ex: "Serviço", "Taxa", "Saque"
}

export type FinanceProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "FinanceProviderScreen"
>;
