import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ClientHeader } from "../components/ClientHeader";

// Telas
import HomeClientScreen from "../screens/client/HomeClient";
import ProfileScreen from "../screens/client/ProfileScreen";
import MessagesScreen from "../screens/client/MessagesScreen";
import HistoryScreen from "../screens/client/HistoryScreen";
import InvoicesClients from "../screens/client/InvoicesClients";

const Tab = createBottomTabNavigator();

export function ClientTabs() {
  return (
    <View style={{ flex: 1 }}>
      <ClientHeader />

      {/* Tabs */}
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#57B2C5",
            tabBarInactiveTintColor: "#0C0C0C",
            tabBarStyle: {
              backgroundColor: "#FFF8EC",
              borderTopWidth: 1,
              borderTopColor: "#D9D9D9",
              height: 60,
              paddingBottom: 5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

              if (route.name === "Início") iconName = "home-outline";
              if (route.name === "Mensagens")
                iconName = "chatbubble-ellipses-outline";
              if (route.name === "Histórico") iconName = "time-outline";
              if (route.name === "Perfil") iconName = "person-outline";
              if (route.name === "Pedidos") iconName = "file-tray-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Início" component={HomeClientScreen} />
          <Tab.Screen name="Pedidos" component={InvoicesClients} />
          <Tab.Screen name="Mensagens" component={MessagesScreen} />
          <Tab.Screen name="Histórico" component={HistoryScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
