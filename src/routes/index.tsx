import { View, ActivityIndicator } from "react-native";
import AuthStack from "./AuthStack";
import { ClientStack } from "./ClientStack";
import { ProviderStack } from "./ProviderStack";
import { useAuth } from "../contexts/AuthContext";

export default function Routes() {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#df692b" />
      </View>
    );
  }

  if (!user) return <AuthStack />;
  if (userType === "client") return <ClientStack />;
  if (userType === "provider") return <ProviderStack />;

  return <AuthStack />;
}
