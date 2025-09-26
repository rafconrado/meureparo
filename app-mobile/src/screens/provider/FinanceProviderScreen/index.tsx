import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

export default function FinanceProviderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>
      <Text style={styles.text}>Resumo das suas finanças.</Text>
    </View>
  );
}
