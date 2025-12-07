import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import SelectionScreen from "../screens/auth/SelectionScreen";

import LoginClienteScreen from "../screens/auth/LoginClientScreen";
import RegisterClient from "../screens/auth/RegisterClient";
import RegisterClientStep2 from "../screens/auth/RegisterClientStep2";

import LoginProviderScreen from "../screens/auth/LoginProviderScreen";

import RegisterProviderStep1 from "../screens/auth/RegisterProvider";
import RegisterProviderStep2 from "../screens/auth/RegisterProviderStep2";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="SelectionScreen" component={SelectionScreen} />

      <Stack.Screen name="LoginClient" component={LoginClienteScreen} />

      <Stack.Screen name="LoginProvider" component={LoginProviderScreen} />

      <Stack.Screen name="RegisterClient" component={RegisterClient} />
      <Stack.Screen
        name="RegisterClientStep2"
        component={RegisterClientStep2}
      />

      <Stack.Screen
        name="RegisterProviderStep1"
        component={RegisterProviderStep1}
      />
      <Stack.Screen
        name="RegisterProviderStep2"
        component={RegisterProviderStep2}
      />
    </Stack.Navigator>
  );
}
