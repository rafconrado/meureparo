import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  StatusBar,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Contexts & Hooks
import { useAuth } from "../../../contexts/AuthContext";

// API & Data
import api from "../../../services/api";
import { promosData, partnersData } from "../../../data/mockData";

// Types
import { ClientStackParamList } from "../../../@types/navigation";
import type { Provider, Category, Promo, Partner } from "../../../types";

// Components
import { CategoryCardItem } from "../../../components/CategoryCardItem";
import { FeaturedProviderCard } from "../../../components/FeaturedProviderCard";
import { ProviderCarouselCard } from "../../../components/ProviderCarouselCard";
import { PromoCardItem } from "../../../components/PromoCardItem";
import { PartnerItem } from "../../../components/PartnerItem";
import { SearchBar } from "../../../components/SearchBar";

// Styles
import {
  Container,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  LoadingContainer,
} from "./style";

type HomeClientNavigationProp = NativeStackNavigationProp<
  ClientStackParamList,
  "HomeClient"
>;

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.8;
const HORIZONTAL_PADDING = (screenWidth - CARD_WIDTH) / 2 - 4;

const HomeClient = () => {
  const { user } = useAuth();
  const navigation = useNavigation<HomeClientNavigationProp>();

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [apiData, setApiData] = useState({
    providers: [] as Provider[],
    categories: [] as Category[],
    promos: [] as Promo[],
    partners: [] as Partner[],
  });

  const fetchData = useCallback(async () => {
    setError(null);
    if (!refreshing) {
      setIsLoading(true);
    }
    try {
      const [adsResponse, categoriesResponse] = await Promise.all([
        api.get("/ads").catch((err) => {
          console.warn("Erro ao buscar anúncios:", err.message);
          return { data: { data: [], success: false } };
        }),
        api.get("/categories").catch((err) => {
          console.warn("Erro ao buscar categorias:", err.message);
          return { data: [] };
        }),
      ]);

      setApiData({
        providers: adsResponse.data.data || [],
        categories: categoriesResponse.data || [],
        promos: promosData,
        partners: partnersData,
      });
    } catch (err) {
      console.error("Erro geral ao buscar dados:", err);
      setApiData({
        providers: [],
        categories: [],
        promos: promosData,
        partners: partnersData,
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const featuredProviders = useMemo(
    () => apiData.providers.filter((p) => p.isPromoted || p.discount),
    [apiData.providers]
  );

  const mostPopularProviders = useMemo(
    () =>
      [...apiData.providers]
        .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        .slice(0, 5),
    [apiData.providers]
  );

  const handleSearch = useCallback(() => {
    console.log("Buscando por:", searchText);
  }, [searchText]);

  const handleCategoryPress = useCallback(
    (category: any) => {
      navigation.navigate("CategoryScreen", {
        categoryId: String(category.id),
        categoryName: category.name,
      });
    },
    [navigation]
  );

  const handleProviderPress = useCallback(
    (provider: Provider) => {
      if (provider.advertisementId) {
        navigation.navigate("AdvertisementDetail", {
          adId: String(provider.advertisementId),
        });
      } else {
        console.warn(
          `Prestador ${provider.name} não possui um anúncio associado.`
        );
      }
    },
    [navigation]
  );

  if (isLoading && !refreshing) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#ff8724" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <Ionicons name="cloud-offline-outline" size={48} color="#999" />
        <Text style={{ marginTop: 16, color: "#666", textAlign: "center" }}>
          {error}
        </Text>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ff8724"]}
          />
        }
      >
        <Title>Olá, {user?.name || "Usuário"} 👋</Title>
        <Subtitle>Encontre os melhores profissionais perto de você</Subtitle>

        {/* Componente SearchBar */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />

        {/* Categorias Populares */}
        <Section>
          <SectionTitle>Categorias Populares</SectionTitle>

          <FlatList
            data={apiData.categories.slice(0, 8)}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CategoryCardItem
                item={{ ...item, id: String(item.id) } as any}
                onPress={() => handleCategoryPress(item)}
              />
            )}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ListEmptyComponent={
              <Text style={{ padding: 20, textAlign: "center" }}>
                Nenhuma categoria encontrada. Verifique os dados.
              </Text>
            }
          />
        </Section>

        {/* Ofertas Especiais */}
        <Section>
          <SectionTitle>🔥 Ofertas Especiais</SectionTitle>
          <FlatList
            data={apiData.promos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PromoCardItem item={{ ...item, id: String(item.id) } as any} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </Section>

        {/* Profissionais em Destaque */}
        <Section>
          <SectionTitle>⭐ Profissionais em Destaque</SectionTitle>
          <FlatList
            data={featuredProviders}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <FeaturedProviderCard
                provider={{ ...item, id: String(item.id) } as any}
                onPress={() => handleProviderPress(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </Section>

        {/* Anúncios Mais Populares */}
        <Section>
          <SectionTitle>🚀 Anúncios Mais Populares</SectionTitle>
          <FlatList
            data={mostPopularProviders}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ProviderCarouselCard
                provider={{ ...item, id: String(item.id) } as any}
                onPress={() => handleProviderPress(item)}
                cardWidth={CARD_WIDTH}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 8}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: HORIZONTAL_PADDING,
            }}
          />
        </Section>

        {/* Parceiros de Confiança */}
        <Section>
          <SectionTitle>Parceiros de confiança</SectionTitle>
          <FlatList
            data={apiData.partners}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PartnerItem partner={{ ...item, id: String(item.id) } as any} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

export default HomeClient;
