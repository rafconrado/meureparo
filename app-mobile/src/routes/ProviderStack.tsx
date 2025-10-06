import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProviderTabs } from "./ProviderTabs";

const Provider = createNativeStackNavigator();

export function ProviderStack() {
  return (
    <Provider.Navigator screenOptions={{ headerShown: false }}>
      <Provider.Screen
        name="ProviderTabs"
        component={ProviderTabs}
      />

    </Provider.Navigator>
  );
}