import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProviderHeader } from "../components/ProviderHeader";

import HomeProvider from "../screens/provider/HomeProvider";
import MessagesProviderScreen from "../screens/provider/MessagesProviderScreen";
import AdsProviderScreen from "../screens/provider/AdsProviderScreen";
import FinanceProviderScreen from "../screens/provider/FinanceProviderScreen";
import ProfileScreen from "../screens/provider/ProfileScreen";

const Tab = createBottomTabNavigator();

const COLORS = {
  active: "#57B2C5",
  inactive: "#9CA3AF",
  background: "#FFFFFF",
  iconBg: "#57B2C5",
  iconBgInactive: "#F3F4F6",
};

export function ProviderTabs() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <ProviderHeader />

      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
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
                case "Mensagens":
                  iconName = "chatbubble-ellipses";
                  break;
                case "Anúncios":
                  iconName = "megaphone";
                  break;
                case "Financeiro":
                  iconName = "cash";
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