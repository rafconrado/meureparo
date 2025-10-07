import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/client/CategoryScreen";

import { ClientTabs } from "./ClientTabs";

export type ClientStackParamList = {
  ClientTabs: undefined;
  CategoryScreen: { categoryId: number; categoryName: string };
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

export function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClientTabs"
        component={ClientTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params.categoryName,
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}
