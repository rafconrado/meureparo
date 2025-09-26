import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

export default function MessagesProviderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensagens</Text>
      <Text style={styles.text}>Aqui você troca mensagens com clientes.</Text>
    </View>
  );
}
