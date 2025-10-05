import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ClientHeader } from "../components/ClientHeader";

// Telas
import HomeClientScreen from "../screens/client/HomeClient";
import ProfileScreen from "../screens/client/ProfileScreen";
import MessagesScreen from "../screens/client/MessagesScreen";
import HistoryScreen from "../screens/client/HistoryScreen";
import InvoicesClients from "../screens/client/InvoicesClients";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

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

        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: Platform.OS === "ios" ? height * 0.085 + insets.bottom : height * 0.075,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom / 2 : 8,
          paddingHorizontal: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },

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
                  backgroundColor: focused ? COLORS.iconBg : COLORS.iconBgInactive,
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
      <Tab.Screen name="Início" component={HomeClientScreen} />
      <Tab.Screen name="Pedidos" component={InvoicesClients} />
      <Tab.Screen name="Mensagens" component={MessagesScreen} />
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 32,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});