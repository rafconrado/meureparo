import React from "react";
import { StatusBar, ScrollView } from "react-native";
import { CustomCarousel } from "../../../components/Carousel";
import { useAuth } from "../../../contexts/AuthContext";

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
} from "./style";

const adsData = [
  { id: "1", image: require("../../../assets/images/anuncios/ad3.png") },
  { id: "2", image: require("../../../assets/images/anuncios/ad2.png") },
];

const servicesData = [
  {
    id: "1",
    title: "Pintura",
    price: "R$ 200",
    image: require("../../../assets/images/anuncios/ad3.png"),
  },
  {
    id: "2",
    title: "Encanamento",
    price: "R$ 150",
    image: require("../../../assets/images/anuncios/ad2.png"),
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

  if (loading) return <Title>Carregando...</Title>;

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Olá, {user?.name || "Usuário"} 👋</Title>
        <Subtitle>Encontre serviços de confiança perto de você</Subtitle>

        <Section>
          <CustomCarousel
            title="Destaques"
            data={adsData}
            renderItem={(item) => (
              <CarouselImage source={item.image} resizeMode="cover" />
            )}
          />
        </Section>

        <Section>
          <CustomCarousel
            title="Serviços Recomendados"
            data={servicesData}
            height={240}
            renderItem={(item) => (
              <ServiceCard>
                <ServiceImage source={item.image} resizeMode="cover" />
                <ServiceTitle>{item.title}</ServiceTitle>
                <ServiceFromText>A partir de</ServiceFromText>
                <ServicePrice>{item.price}</ServicePrice>
                <ServiceButton activeOpacity={0.8}>
                  <ServiceButtonText>Contratar</ServiceButtonText>
                </ServiceButton>
              </ServiceCard>
            )}
          />
        </Section>

        <Section>
          <CustomCarousel
            title="Parceiros de confiança"
            data={partnersData}
            height={140} // ajuste de altura para caber o logo
            renderItem={(item) => (
              <PartnerContainer>
                <PartnerLogo source={item.logo} />
                <PartnerName>{item.name}</PartnerName>
              </PartnerContainer>
            )}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

export default HomeClient;
