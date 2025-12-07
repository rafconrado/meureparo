import React, { useState, useEffect, useCallback } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// API & Tipos
import api from "../../services/api";
import { Provider } from "../../types";

// Componentes
import { ProviderListItem } from "../../components/ProviderListItem";

// Estilos
import {
  Container,
  LoadingContainer,
  EmptyContainer,
  EmptyText,
} from "./style";

type CategoryScreenRouteProp = RouteProp<
  {
    params: {
      categoryId: string;
      categoryName: string;
    };
  },
  "params"
>;

const CategoryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { categoryId } = route.params;

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#ff8724" />
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <EmptyContainer>
          <Ionicons name="cloud-offline-outline" size={48} color="#999" />
          <EmptyText>{error}</EmptyText>
        </EmptyContainer>
      );
    }

    if (providers.length === 0) {
      return (
        <EmptyContainer>
          <Ionicons name="search-outline" size={48} color="#999" />
          <EmptyText>
            Nenhum profissional encontrado nesta categoria ainda.
          </EmptyText>
        </EmptyContainer>
      );
    }

    return (
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProviderListItem provider={item} onPress={handleProviderPress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
      />
    );
  };

  return <Container>{renderContent()}</Container>;
};

export default CategoryScreen;
