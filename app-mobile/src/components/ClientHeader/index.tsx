// components/ClientHeader.tsx
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ClientHeader() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFF8EC",
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
      }}
    >
      {/* avatar do cliente */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil" as never)}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/156972984?v=40",
          }}
          style={{ width: 36, height: 36, borderRadius: 18 }}
        />
      </TouchableOpacity>

      {/* lupa de busca */}
      <TouchableOpacity onPress={() => console.log("Pesquisar")}>
        <Ionicons name="search-outline" size={24} color="#0C0C0C" />
      </TouchableOpacity>
    </View>
  );
}
