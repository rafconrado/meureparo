import React from "react";
import { View, Dimensions, Platform, StyleSheet } from "react-native";
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

const { height } = Dimensions.get("window");

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

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,

            tabBarActiveTintColor: COLORS.active,
            tabBarInactiveTintColor: COLORS.inactive,

            tabBarStyle: {
              backgroundColor: COLORS.background,
              borderTopWidth: 1,
              borderTopColor: "#E5E7EB",
              height:
                Platform.OS === "ios"
                  ? height * 0.085 + insets.bottom
                  : height * 0.075,
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
  iconContainer: {
    width: 48,
    height: 32,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
