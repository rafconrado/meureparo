import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

export interface ChatData {
  id: string;
  clientName: string;
  avatarUrl?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

export type MessagesProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "MessagesProvider"
>;
