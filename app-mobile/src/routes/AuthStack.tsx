import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import SelectionScreen from "../screens/SelectionScreen";

import LoginClienteScreen from "../screens/client/LoginClientScreen";
import RegisterClient from "../screens/client/RegisterClient";
import RegisterClientStep2 from "../screens/client/RegisterClientStep2";
import HomeClient from "../screens/client/HomeClient";

import LoginProviderScreen from "../screens/provider/LoginProviderScreen";
import RegisterProvider from "../screens/provider/RegisterProvider";
import RegisterProviderStep2 from "../screens/provider/RegisterProviderStep2";

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
