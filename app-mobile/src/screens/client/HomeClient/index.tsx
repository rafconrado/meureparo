import React, { useEffect, useState } from "react";
import { StatusBar, ScrollView, View, ActivityIndicator, RefreshControl } from "react-native";
import { CustomCarousel } from "../../../components/Carousel";
import { useAuth } from "../../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Title,
  Subtitle,
  Section,
  CarouselImage,
  ServiceCard,
  ServiceFromText,
  ServiceImage,
  ServiceTitle,
  ServicePrice,
  ServiceButton,
  ServiceButtonText,
  PartnerContainer,
  PartnerLogo,
  PartnerName,
  SectionTitle,
  ProviderCard,
  ProviderImage,
  ProviderInfo,
  ProviderName,
  ProviderCategory,
  ProviderRating,
  RatingContainer,
  RatingText,
  ProviderPrice,
  ProviderBadge,
  BadgeText,
  SearchContainer,
  SearchInput,
  SearchButton,
  CategoryCard,
  CategoryIcon,
  CategoryName,
  PromoCard,
  PromoContent,
  PromoTitle,
  PromoDescription,
  PromoDiscount,
  LoadingContainer,
} from "./style";

// Tipos
interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image: any;
  isVerified?: boolean;
  isPromoted?: boolean;
  discount?: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Promo {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  providerName: string;
}

// Dados mockados - em produção viriam da API
const providersData: Provider[] = [
  {
    id: "1",
    name: "João Silva",
    category: "Eletricista",
    rating: 4.8,
    reviews: 127,
    price: "R$ 80/hora",
    image: require("../../../assets/images/utils/placeholder.png"),
    isVerified: true,
    isPromoted: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    category: "Diarista",
    rating: 4.9,
    reviews: 89,
    price: "R$ 150/dia",
    image: require("../../../assets/images/utils/placeholder.png"),
    isVerified: true,
    discount: 15,
  },
  {
    id: "3",
    name: "Pedro Costa",
    category: "Encanador",
    rating: 4.7,
    reviews: 65,
    price: "R$ 100/hora",
    image: require("../../../assets/images/utils/placeholder.png"),
    isVerified: false,
  },
  {
    id: "4",
    name: "Ana Oliveira",
    category: "Pintura",
    rating: 5.0,
    reviews: 203,
    price: "R$ 200/dia",
    image: require("../../../assets/images/utils/placeholder.png"),
    isVerified: true,
    isPromoted: true,
    discount: 20,
  },
];

const categoriesData: Category[] = [
  { id: "1", name: "Elétrica", icon: "flash", color: "#FFB800" },
  { id: "2", name: "Hidráulica", icon: "water", color: "#4A90E2" },
  { id: "3", name: "Limpeza", icon: "sparkles", color: "#7ED321" },
  { id: "4", name: "Pintura", icon: "brush", color: "#F5A623" },
  { id: "5", name: "Reformas", icon: "hammer", color: "#BD10E0" },
  { id: "6", name: "Jardinagem", icon: "leaf", color: "#50E3C2" },
];

const promosData: Promo[] = [
  {
    id: "1",
    title: "Primeira Contratação",
    description: "Desconto especial para novos clientes",
    discount: "30% OFF",
    validUntil: "31/10/2025",
    providerName: "João Silva",
  },
  {
    id: "2",
    title: "Combo Limpeza",
    description: "Limpeza completa com desconto",
    discount: "25% OFF",
    validUntil: "15/11/2025",
    providerName: "Maria Santos",
  },
];

const partnersData = [
  {
    id: "1",
    name: "Amanco",
    logo: require("../../../assets/images/logo/amanco.png"),
  },
  {
    id: "2",
    name: "Tigre",
    logo: require("../../../assets/images/logo/tigre logo.png"),
  },
  {
    id: "3",
    name: "Lorenzetti",
    logo: require("../../../assets/images/logo/lorenzetti.png"),
  },
  {
    id: "4",
    name: "Suvinil",
    logo: require("../../../assets/images/logo/suvinil.png"),
  },
];

const HomeClient = () => {
  const { user, loading } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [providers, setProviders] = useState<Provider[]>(providersData);
  const [featuredProviders, setFeaturedProviders] = useState<Provider[]>([]);

  useEffect(() => {
    // Filtrar providers em destaque (promovidos ou com desconto)
    const featured = providersData.filter(p => p.isPromoted || p.discount);
    setFeaturedProviders(featured);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carregamento de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSearch = () => {
    // Implementar lógica de busca
    console.log("Buscando:", searchText);
  };

  const handleCategoryPress = (category: Category) => {
    // Navegar para lista de providers da categoria
    console.log("Categoria selecionada:", category.name);
  };

  const handleProviderPress = (provider: Provider) => {
    // Navegar para detalhes do provider
    console.log("Provider selecionado:", provider.name);
  };

  if (loading) {
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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ff8724"]}
          />
        }
      >
        <Title>Olá, {user?.name || "Usuário"} 👋</Title>
        <Subtitle>Encontre os melhores profissionais perto de você</Subtitle>

        {/* Barra de Pesquisa */}
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

        {/* Categorias */}
        <Section>
          <SectionTitle>Categorias Populares</SectionTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                color={category.color}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <CategoryIcon color={category.color}>
                  <Ionicons name={category.icon as any} size={24} color="#FFF" />
                </CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
              </CategoryCard>
            ))}
          </ScrollView>
        </Section>

        {/* Promoções */}
        <Section>
          <CustomCarousel
            title="🔥 Ofertas Especiais"
            data={promosData}
            height={140}
            renderItem={(item) => (
              <PromoCard
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <PromoContent>
                  <View>
                    <PromoTitle>{item.title}</PromoTitle>
                    <PromoDescription>{item.description}</PromoDescription>
                    <Subtitle style={{ fontSize: 12, marginTop: 4 }}>
                      {item.providerName} • Até {item.validUntil}
                    </Subtitle>
                  </View>
                  <PromoDiscount>{item.discount}</PromoDiscount>
                </PromoContent>
              </PromoCard>
            )}
          />
        </Section>

        {/* Providers em Destaque */}
        <Section>
          <SectionTitle>⭐ Profissionais em Destaque</SectionTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {featuredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                onPress={() => handleProviderPress(provider)}
                activeOpacity={0.9}
              >
                {provider.discount && (
                  <ProviderBadge style={{ backgroundColor: "#FF4444" }}>
                    <BadgeText>{provider.discount}% OFF</BadgeText>
                  </ProviderBadge>
                )}
                {provider.isPromoted && !provider.discount && (
                  <ProviderBadge>
                    <BadgeText>DESTAQUE</BadgeText>
                  </ProviderBadge>
                )}
                <ProviderImage source={provider.image} />
                <ProviderInfo>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <ProviderName>{provider.name}</ProviderName>
                    {provider.isVerified && (
                      <Ionicons name="checkmark-circle" size={16} color="#4A90E2" />
                    )}
                  </View>
                  <ProviderCategory>{provider.category}</ProviderCategory>
                  <RatingContainer>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <RatingText>{provider.rating}</RatingText>
                    <RatingText style={{ color: "#999" }}>
                      ({provider.reviews})
                    </RatingText>
                  </RatingContainer>
                  <ProviderPrice>{provider.price}</ProviderPrice>
                </ProviderInfo>
              </ProviderCard>
            ))}
          </ScrollView>
        </Section>

        {/* Todos os Providers */}
        <Section>
          <CustomCarousel
            title="Todos os Profissionais"
            data={providers}
            height={280}
            renderItem={(provider) => (
              <ServiceCard>
                {provider.isVerified && (
                  <View style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    zIndex: 1,
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    padding: 4,
                  }}>
                    <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
                  </View>
                )}
                <ServiceImage source={provider.image} resizeMode="cover" />
                <ServiceTitle>{provider.name}</ServiceTitle>
                <ProviderCategory>{provider.category}</ProviderCategory>
                <RatingContainer style={{ marginTop: 6 }}>
                  <Ionicons name="star" size={16} color="#FFB800" />
                  <RatingText>{provider.rating} • {provider.reviews} avaliações</RatingText>
                </RatingContainer>
                <ServiceFromText>A partir de</ServiceFromText>
                <ServicePrice>{provider.price}</ServicePrice>
                <ServiceButton
                  activeOpacity={0.8}
                  onPress={() => handleProviderPress(provider)}
                >
                  <ServiceButtonText>Ver Perfil</ServiceButtonText>
                </ServiceButton>
              </ServiceCard>
            )}
          />
        </Section>

        {/* Parceiros */}
        <Section>
          <SectionTitle>Parceiros de confiança</SectionTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {partnersData.map((partner) => (
              <PartnerContainer key={partner.id}>
                <PartnerLogo source={partner.logo} />
                <PartnerName>{partner.name}</PartnerName>
              </PartnerContainer>
            ))}
          </ScrollView>
        </Section>
      </ScrollView>
    </Container>
  );
};

export default HomeClient;