import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeClient from "../screens/HomeClient";

const Client = createNativeStackNavigator();

export function ClientStack() {
  return (
    <Client.Navigator screenOptions={{ headerShown: false }}>
      <Client.Screen name="HomeClient" component={HomeClient} />
      {/* outras telas do cliente aqui */}
    </Client.Navigator>
  );
}