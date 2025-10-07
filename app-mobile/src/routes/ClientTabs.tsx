import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ClientHeader } from "../components/ClientHeader";

// Telas
import HomeClient from "../screens/client/HomeClient";
import ProfileScreen from "../screens/client/ProfileScreen";
import MessagesScreen from "../screens/client/MessagesScreen";
import HistoryScreen from "../screens/client/HistoryScreen";
import InvoicesClients from "../screens/client/InvoicesClients";

const Tab = createBottomTabNavigator();

const COLORS = {
  active: "#000000",
  inactive: "#9CA3AF",
  background: "#FFFFFF",
  iconBg: "#000000",
  iconBgInactive: "#F3F4F6",
};

export function ClientTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <ClientHeader />,
        headerShown: true,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 65 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          },
        ],

        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,

        tabBarIcon: ({ color, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Início":
              iconName = "home";
              break;
            case "Pedidos":
              iconName = "file-tray-full";
              break;
            case "Mensagens":
              iconName = "chatbubble-ellipses";
              break;
            case "Histórico":
              iconName = "time";
              break;
            case "Perfil":
              iconName = "person";
              break;
            default:
              iconName = "alert-circle";
              break;
          }

          return (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused
                    ? COLORS.iconBg
                    : COLORS.iconBgInactive,
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? "#FFFFFF" : COLORS.inactive}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeClient} />
      <Tab.Screen name="Pedidos" component={InvoicesClients} />
      <Tab.Screen name="Mensagens" component={MessagesScreen} />
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  iconContainer: {
    width: 48,
    height: 32,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
