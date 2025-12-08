import React, { useState } from "react";
import { StatusBar, Switch, Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../contexts/AuthContext";

// Styles
import {
  Container,
  Header,
  HeaderTop,
  WelcomeText,
  UserName,
  StatusContainer,
  StatusText,
  DashboardCard,
  StatItem,
  StatValue,
  StatLabel,
  SectionTitle,
  RequestCard,
  RequestHeader,
  ClientInfo,
  ClientName,
  ServiceBadge,
  ServiceText,
  RequestDetails,
  DetailItem,
  DetailText,
  ActionButtons,
  AcceptButton,
  RejectButton,
  ButtonLabel,
  EmptyContainer,
  EmptyText,
} from "./styles";

import { HomeProviderNavigationProp, ServiceRequest } from "./types";

// Mock Data (Simulando pedidos chegando do backend)
const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: "1",
    clientName: "Ana Paula",
    serviceType: "Pintura",
    distance: "2.5 km",
    price: "R$ 150,00",
    date: "Hoje, 14:00",
  },
  {
    id: "2",
    clientName: "Roberto Carlos",
    serviceType: "Pintura",
    distance: "5.0 km",
    price: "R$ 150,00",
    date: "Amanhã, 09:00",
  },
];

const HomeProvider = () => {
  const navigation = useNavigation<HomeProviderNavigationProp>();
  const { user } = useAuth();

  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_REQUESTS);

  const toggleSwitch = () => setIsOnline((previousState) => !previousState);

  const handleAccept = (id: string) => {
    Alert.alert("Sucesso", "Serviço aceito! Entre em contato com o cliente.");
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const renderRequestItem = ({ item }: { item: ServiceRequest }) => (
    <RequestCard>
      <RequestHeader>
        <ClientInfo>
          <Feather name="user" size={16} color="#555" />
          <ClientName>{item.clientName}</ClientName>
        </ClientInfo>
        <ServiceBadge>
          <ServiceText>{item.serviceType}</ServiceText>
        </ServiceBadge>
      </RequestHeader>

      <RequestDetails>
        <DetailItem>
          <Feather name="map-pin" size={14} color="#999" />
          <DetailText>{item.distance}</DetailText>
        </DetailItem>
        <DetailItem>
          <Feather name="calendar" size={14} color="#999" />
          <DetailText>{item.date}</DetailText>
        </DetailItem>
        <DetailItem>
          <Feather name="dollar-sign" size={14} color="#28a745" />
          <DetailText style={{ color: "#28a745", fontWeight: "bold" }}>
            {item.price}
          </DetailText>
        </DetailItem>
      </RequestDetails>

      <ActionButtons>
        <RejectButton onPress={() => handleReject(item.id)}>
          <Feather name="x" size={20} color="#dc3545" />
          <ButtonLabel style={{ color: "#dc3545" }}>Recusar</ButtonLabel>
        </RejectButton>
        <AcceptButton onPress={() => handleAccept(item.id)}>
          <Feather name="check" size={20} color="#fff" />
          <ButtonLabel style={{ color: "#fff" }}>Aceitar</ButtonLabel>
        </AcceptButton>
      </ActionButtons>
    </RequestCard>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />

      {/* Header com Saldo e Status */}
      <Header>
        <HeaderTop>
          <View>
            <WelcomeText>Olá,</WelcomeText>
            <UserName>{user?.name || "Prestador"}</UserName>
          </View>
          <StatusContainer>
            <StatusText>{isOnline ? "Online" : "Offline"}</StatusText>
            <Switch
              trackColor={{ false: "#767577", true: "#81d4e3" }}
              thumbColor={isOnline ? "#fff" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isOnline}
            />
          </StatusContainer>
        </HeaderTop>

        {/* Card Flutuante de Estatísticas */}
        <DashboardCard>
          <StatItem>
            <StatValue>R$ 1.250</StatValue>
            <StatLabel>Saldo Mês</StatLabel>
          </StatItem>
          <StatItem
            style={{
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "#eee",
            }}
          >
            <StatValue>12</StatValue>
            <StatLabel>Serviços</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>4.9</StatValue>
            <StatLabel>Avaliação</StatLabel>
          </StatItem>
        </DashboardCard>
      </Header>

      {/* Lista de Novos Pedidos */}
      <SectionTitle>Novos Pedidos</SectionTitle>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <Feather name="inbox" size={40} color="#ccc" />
            <EmptyText>Nenhum pedido novo no momento.</EmptyText>
          </EmptyContainer>
        )}
      />
    </Container>
  );
};

import { View } from "react-native";

export default HomeProvider;
