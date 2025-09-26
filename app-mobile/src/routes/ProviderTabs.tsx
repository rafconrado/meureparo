import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProviderHeader } from "../components/ProviderHeader";

import HomeProvider from "../screens/provider/HomeProvider";
import MessagesProviderScreen from "../screens/provider/MessagesProviderScreen";
import AdsProviderScreen from "../screens/provider/AdsProviderScreen";
import FinanceProviderScreen from "../screens/provider/FinanceProviderScreen";
import ProfileScreen from "../screens/provider/ProfileScreen";

const Tab = createBottomTabNavigator();

export function ProviderTabs() {
  return (
    <View style={{ flex: 1 }}>
      <ProviderHeader />

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#57B2C5",
            tabBarInactiveTintColor: "#0C0C0C",
            tabBarStyle: {
              backgroundColor: "#FFF",
              borderTopWidth: 1,
              borderTopColor: "#D9D9D9",
              height: 60,
              paddingBottom: 5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

              if (route.name === "Início") iconName = "home-outline";
              if (route.name === "Pedidos") iconName = "file-tray-outline";
              if (route.name === "Mensagens")
                iconName = "chatbubble-ellipses-outline";
              if (route.name === "Anúncios") iconName = "megaphone-outline";
              if (route.name === "Financeiro") iconName = "cash-outline";
              if (route.name === "Perfil") iconName = "person-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Início" component={HomeProvider} />
          <Tab.Screen name="Mensagens" component={MessagesProviderScreen} />
          <Tab.Screen name="Anúncios" component={AdsProviderScreen} />
          <Tab.Screen name="Financeiro" component={FinanceProviderScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
