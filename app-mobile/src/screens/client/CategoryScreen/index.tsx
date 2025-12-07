import React, { useState, useEffect, useCallback } from "react";
import { FlatList, ActivityIndicator, ListRenderItem } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import api from "../../../services/api";
import { Provider } from "../../../types";
import { ProviderListItem } from "../../../components/ProviderListItem";
import { CategoryScreenProps } from "./types";

import {
  Container,
  LoadingContainer,
  EmptyContainer,
  EmptyText,
} from "./styles";

const LOADING_COLOR = "#ff8724";
const ICON_SIZE = 48;
const ICON_COLOR = "#999";

export function CategoryScreen() {
  const navigation = useNavigation<CategoryScreenProps["navigation"]>();
  const route = useRoute<CategoryScreenProps["route"]>();
  const { categoryId, categoryName } = route.params;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvidersByCategory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/ads?categoryId=${categoryId}`);
        setProviders(response.data);
      } catch (err) {
        console.error("Erro ao buscar prestadores por categoria:", err);
        setError(
          "Não foi possível carregar os profissionais. Tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchProvidersByCategory();
    }
  }, [categoryId]);

  const handleProviderPress = useCallback(
    (provider: Provider) => {
      if (provider.advertisementId) {
        navigation.navigate("AdvertisementDetail", {
          adId: provider.advertisementId,
        });
      }
    },
    [navigation]
  );

  const renderItem: ListRenderItem<Provider> = useCallback(
    ({ item }) => (
      <ProviderListItem provider={item} onPress={handleProviderPress} />
    ),
    [handleProviderPress]
  );

  const keyExtractor = useCallback((item: Provider) => item.id.toString(), []);

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={LOADING_COLOR} />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyContainer>
          <Ionicons
            name="cloud-offline-outline"
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <EmptyText>{error}</EmptyText>
        </EmptyContainer>
      </Container>
    );
  }

  if (providers.length === 0) {
    return (
      <Container>
        <EmptyContainer>
          <Ionicons name="search-outline" size={ICON_SIZE} color={ICON_COLOR} />
          <EmptyText>
            Nenhum profissional encontrado nesta categoria ainda.
          </EmptyText>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={providers}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
      />
    </Container>
  );
}
