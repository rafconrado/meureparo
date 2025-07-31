import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import SelectionScreen from "../screens/SelectionScreen";
import LoginClienteScreen from "../screens/LoginClientScreen";
import LoginProviderScreen from "../screens/LoginProviderScreen";
import RegisterClient from "../screens/RegisterClient";
import RegisterProvider from "../screens/RegisterProvider";
import RegisterClientStep2 from "../screens/RegisterClientStep2";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Selection" component={SelectionScreen} />
      <Stack.Screen name="LoginCliente" component={LoginClienteScreen} />
      <Stack.Screen name="LoginProvider" component={LoginProviderScreen} />
      <Stack.Screen name="RegisterClient" component={RegisterClient} />
      <Stack.Screen name="RegisterProvider" component={RegisterProvider} />
      <Stack.Screen
        name="RegisterClientStep2"
        component={RegisterClientStep2}
      />
    </Stack.Navigator>
  );
}
