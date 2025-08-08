import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import SelectionScreen from "../screens/SelectionScreen";

import LoginClienteScreen from "../screens/LoginClientScreen";
import RegisterClient from "../screens/RegisterClient";
import RegisterClientStep2 from "../screens/RegisterClientStep2";
import HomeClient from "../screens/HomeClient";

import LoginProviderScreen from "../screens/LoginProviderScreen";
import RegisterProvider from "../screens/RegisterProvider";
import RegisterProviderStep2 from "../screens/RegisterProviderStep2";

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
        name="RegisterProviderStep2"
        component={RegisterProviderStep2}
      />
      <Stack.Screen
        name="RegisterClientStep2"
        component={RegisterClientStep2}
      />
      <Stack.Screen name="HomeClient" component={HomeClient} />
    </Stack.Navigator>
  );
}
