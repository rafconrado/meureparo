import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeClient from "../screens/client/HomeClient";

const Client = createNativeStackNavigator();

export function ClientStack() {
  return (
    <Client.Navigator screenOptions={{ headerShown: false }}>
      <Client.Screen name="HomeClient" component={HomeClient} />
    </Client.Navigator>
  );
}