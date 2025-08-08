import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeProvider from "../screens/HomeProvider/index";

const Provider = createNativeStackNavigator();

export function ProviderStack() {
  return (
    <Provider.Navigator screenOptions={{ headerShown: false }}>
      <Provider.Screen name="HomeProvider" component={HomeProvider} />
    </Provider.Navigator>
  );
}
