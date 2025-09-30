import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StatusBar, ScrollView, ActivityIndicator, RefreshControl, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";

import { CustomCarousel } from "../../../components/Carousel";
import {
  Container,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  SearchContainer,
  SearchInput,
  SearchButton,
  LoadingContainer,
} from "./style";

import type { Provider, Category, Promo, Partner } from '../../../types';
import { providersData, categoriesData, promosData, partnersData } from '../../../data/mockData';

import { CategoryCardItem } from './components/CategoryCardItem';
import { FeaturedProviderCard } from './components/FeaturedPRoviderCard';
import { ProviderCarouselCard } from "./components/ProviderCarouselCard";
import { PromoCardItem } from './components/PromoCardItem';
import { PartnerItem } from './components/PartnerItem';

const HomeClient = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [apiData, setApiData] = useState({
    providers: [] as Provider[],
    categories: [] as Category[],
    promos: [] as Promo[],
    partners: [] as Partner[],
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setApiData({
      providers: providersData,
      categories: categoriesData,
      promos: promosData,
      partners: partnersData,
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const featuredProviders = useMemo(() =>
    apiData.providers.filter(p => p.isPromoted || p.discount),
    [apiData.providers]
  );

  const handleSearch = useCallback(() => {
    console.log("Buscando por:", searchText);
  }, [searchText]);

  const handleCategoryPress = useCallback((category: Category) => {
    navigation.navigate('CategoryScreen', { categoryId: category.id });
  }, [navigation]);

  const handleProviderPress = useCallback((provider: Provider) => {
    if (provider.advertisementId) {
      navigation.navigate('AdvertisementDetail', { adId: provider.advertisementId });
    } else {
      console.warn(`Prestador ${provider.name} não possui um anúncio associado.`);
    }
  }, [navigation]);

  if (isLoading && !refreshing) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#ff8724" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#ff8724"]} />
        }
      >
        <Title>Olá, {user?.name || "Usuário"} 👋</Title>
        <Subtitle>Encontre os melhores profissionais perto de você</Subtitle>

        <SearchContainer>
          <SearchInput
            placeholder="Buscar serviços ou profissionais..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <SearchButton onPress={handleSearch} activeOpacity={0.8}>
            <Ionicons name="search" size={22} color="#FFF" />
          </SearchButton>
        </SearchContainer>

        <Section>
          <SectionTitle>Categorias Populares</SectionTitle>
          <FlatList
            data={apiData.categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CategoryCardItem item={item} onPress={handleCategoryPress} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </Section>

        <Section>
          <CustomCarousel
            title="🔥 Ofertas Especiais"
            data={apiData.promos}
            height={140}
            renderItem={(item) => <PromoCardItem item={item} />}
          />
        </Section>

        <Section>
          <SectionTitle>⭐ Profissionais em Destaque</SectionTitle>
          <FlatList
            data={featuredProviders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FeaturedProviderCard provider={item} onPress={handleProviderPress} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </Section>

        <Section>
          <CustomCarousel
            title="Todos os Profissionais"
            data={apiData.providers}
            height={290}
            renderItem={(item) => <ProviderCarouselCard provider={item} onPress={handleProviderPress} />}
          />
        </Section>

        <Section>
          <SectionTitle>Parceiros de confiança</SectionTitle>
          <FlatList
            data={apiData.partners}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PartnerItem partner={item} />}
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