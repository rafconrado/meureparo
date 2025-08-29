import React from "react";
import { StatusBar, ScrollView } from "react-native";
import { CustomCarousel } from "../../../components/Carousel";
import { useAuth } from "../../../contexts/AuthContext";

import {
  Container,
  Title,
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
    name: "Loja ABC",
    logo: require("../../../assets/images/anuncios/ad1.png"),
  },
  {
    id: "2",
    name: "Loja XYZ",
    logo: require("../../../assets/images/anuncios/ad2.png"),
  },
];

const HomeClient = () => {
  const { user, loading } = useAuth();

  if (loading) return <Title>Carregando...</Title>;

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8EC" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Bem-vindo(a) {user?.name || "Usuário"}!</Title>

        <Section>
          <CustomCarousel
            title="Anúncios"
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
            height={220}
            renderItem={(item) => (
              <ServiceCard>
                <ServiceImage source={item.image} resizeMode="cover" />
                <ServiceTitle>{item.title}</ServiceTitle>
                <ServiceFromText>A partir de:</ServiceFromText>
                <ServicePrice>{item.price}</ServicePrice>
                <ServiceButton>
                  <ServiceButtonText>Contratar</ServiceButtonText>
                </ServiceButton>
              </ServiceCard>
            )}
          />
        </Section>

        <Section>
          <CustomCarousel
            title="Quem acredita, confia:"
            data={partnersData}
            height={150}
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
