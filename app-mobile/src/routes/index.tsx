import { View, ActivityIndicator } from "react-native";
import AuthStack from "./AuthStack";
import { ClientTabs } from "./ClientTabs";
import { ProviderTabs } from "./ProviderTabs";
import { useAuth } from "../contexts/AuthContext";

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#df692b" />
      </View>
    );
  }
  if (user) {
    if (user.userType === "client") return <ClientTabs />;
    if (user.userType === "provider") return <ProviderTabs />;
  }

  return <AuthStack />;
}
