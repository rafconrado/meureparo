import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SplashScreen from "./src/screens/SplashScreen";
import SelectionScreen from "./src/screens/SelectionScreen";
import LoginClienteScreen from "./src/screens/LoginClientScreen";
import LoginProviderScreen from "./src/screens/LoginProviderScreen";
import RegisterClient from "./src/screens/RegisterClient";
import RegisterProvider from "./src/screens/RegisterProvider";
import RegisterClientStep2 from "./src/screens/RegisterClientStep2";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
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
            initialParams={{
              name: "Usuário de Teste",
              cpf: "123.456.789-00",
              email: "teste@exemplo.com",
              password: "senha123",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
