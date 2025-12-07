import React, { useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  HeaderTitle,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ChatItemContainer,
  AvatarContainer,
  AvatarImage,
  AvatarFallback,
  ChatContent,
  ClientName,
  LastMessage,
  MetaContainer,
  TimeText,
  UnreadBadge,
  UnreadText,
  EmptyContainer,
  EmptyText,
} from "./styles";

import { ChatData, MessagesProviderNavigationProp } from "./types";

// Dados falsos (Mock) tipados
const MOCK_CHATS: ChatData[] = [
  {
    id: "1",
    clientName: "Maria Silva",
    lastMessage: "Olá, qual o valor para pintar um quarto?",
    time: "10:30",
    unreadCount: 2,
  },
  {
    id: "2",
    clientName: "João Souza",
    lastMessage: "Combinado, te aguardo amanhã.",
    time: "Ontem",
    unreadCount: 0,
  },
  {
    id: "3",
    clientName: "Ana Clara",
    lastMessage: "Obrigada pelo serviço!",
    time: "Segunda",
    unreadCount: 0,
  },
];

export default function MessagesProviderScreen() {
  const navigation = useNavigation<MessagesProviderNavigationProp>();
  const [searchText, setSearchText] = useState("");

  const filteredChats = MOCK_CHATS.filter((chat) =>
    chat.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChatPress = (chat: ChatData) => {
    console.log("Abrir chat:", chat.id);
  };

  const renderItem = ({ item }: { item: ChatData }) => (
    <ChatItemContainer onPress={() => handleChatPress(item)}>
      <AvatarContainer>
        {item.avatarUrl ? (
          <AvatarImage source={{ uri: item.avatarUrl }} />
        ) : (
          <AvatarFallback>
            <Feather name="user" size={24} color="#57b2c5" />
          </AvatarFallback>
        )}
      </AvatarContainer>

      <ChatContent>
        <ClientName>{item.clientName}</ClientName>
        <LastMessage numberOfLines={1}>{item.lastMessage}</LastMessage>
      </ChatContent>

      <MetaContainer>
        <TimeText>{item.time}</TimeText>
        {item.unreadCount > 0 && (
          <UnreadBadge>
            <UnreadText>{item.unreadCount}</UnreadText>
          </UnreadBadge>
        )}
      </MetaContainer>
    </ChatItemContainer>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />

      <Header>
        <HeaderTitle>Mensagens</HeaderTitle>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <Feather name="search" size={20} color="#999" />
        </SearchIcon>
        <SearchInput
          placeholder="Buscar conversa..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </SearchContainer>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <Feather name="message-square" size={48} color="#ccc" />
            <EmptyText>Nenhuma mensagem encontrada.</EmptyText>
          </EmptyContainer>
        )}
      />
    </Container>
  );
}
