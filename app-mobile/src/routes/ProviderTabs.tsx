import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeProviderScreen from "../screens/provider/HomeProvider";
import ProfileScreen from "../screens/provider/ProfileScreen";

const Tab = createBottomTabNavigator();

export function ProviderTabs() {
  return (
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
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Início") iconName = "briefcase"; 
          if (route.name === "Perfil") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeProviderScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
