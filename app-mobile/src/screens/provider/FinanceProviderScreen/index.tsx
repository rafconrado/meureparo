import React, { useState } from "react";
import { StatusBar, FlatList, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  HeaderTitle,
  BalanceCard,
  BalanceLabel,
  BalanceValue,
  ActionRow,
  ActionButton,
  ActionText,
  SectionTitle,
  TransactionContainer,
  IconBox,
  TransactionInfo,
  TransactionTitle,
  TransactionDate,
  TransactionAmount,
  EmptyContainer,
  EmptyText,
} from "./styles";

import { Transaction, FinanceProviderNavigationProp } from "./types";

// Mock Data (Dados falsos para visualização)
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Serviço de Pintura - Ana P.",
    date: "Hoje, 14:30",
    amount: "R$ 250,00",
    type: "income",
    category: "Serviço",
  },
  {
    id: "2",
    title: "Taxa de Serviço (10%)",
    date: "Hoje, 14:30",
    amount: "- R$ 25,00",
    type: "outcome",
    category: "Taxa",
  },
  {
    id: "3",
    title: "Reparo Elétrico - João S.",
    date: "Ontem, 09:00",
    amount: "R$ 120,00",
    type: "income",
    category: "Serviço",
  },
  {
    id: "4",
    title: "Saque para conta bancária",
    date: "05/12/2025",
    amount: "- R$ 500,00",
    type: "outcome",
    category: "Saque",
  },
];

export default function FinanceProviderScreen() {
  const navigation = useNavigation<FinanceProviderNavigationProp>();
  const [showBalance, setShowBalance] = useState(true);

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionContainer>
      <IconBox type={item.type}>
        <Feather
          name={item.type === "income" ? "arrow-up-right" : "arrow-down-left"}
          size={24}
          color={item.type === "income" ? "#28a745" : "#dc3545"}
        />
      </IconBox>

      <TransactionInfo>
        <TransactionTitle>{item.title}</TransactionTitle>
        <TransactionDate>
          {item.category} • {item.date}
        </TransactionDate>
      </TransactionInfo>

      <TransactionAmount type={item.type}>{item.amount}</TransactionAmount>
    </TransactionContainer>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />

      <Header>
        <HeaderTitle>Minha Carteira</HeaderTitle>
      </Header>

      <BalanceCard>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BalanceLabel>Saldo Disponível</BalanceLabel>
          <Feather
            name={showBalance ? "eye" : "eye-off"}
            size={20}
            color="#666"
            onPress={() => setShowBalance(!showBalance)}
          />
        </View>

        <BalanceValue>{showBalance ? "R$ 1.845,00" : "R$ ••••••"}</BalanceValue>

        <ActionRow>
          <ActionButton onPress={() => console.log("Solicitar Saque")}>
            <Feather name="download" size={20} color="#fff" />
            <ActionText>Sacar</ActionText>
          </ActionButton>

          <ActionButton
            style={{ backgroundColor: "#e0f7fa" }}
            onPress={() => console.log("Ver Extrato Completo")}
          >
            <Feather name="file-text" size={20} color="#0097a7" />
            <ActionText style={{ color: "#0097a7" }}>Extrato</ActionText>
          </ActionButton>
        </ActionRow>
      </BalanceCard>

      <SectionTitle>Últimas Movimentações</SectionTitle>

      <FlatList
        data={MOCK_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <Feather name="dollar-sign" size={40} color="#ccc" />
            <EmptyText>Nenhuma movimentação recente.</EmptyText>
          </EmptyContainer>
        )}
      />
    </Container>
  );
}
