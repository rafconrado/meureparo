import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Alert,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { AxiosError } from "axios";
import api from "../../../services/api";
import theme from "../../../theme";
import { AdFormModal } from "./components/AdFormModal";

import {
  Container,
  Header,
  HeaderContent,
  Logo,
  HeaderTitle,
  ContentContainer,
  Subtitle,
  AdCard,
  AdTitle,
  AdDescription,
  AdPrice,
  AdCategory,
  AdImage,
  AdContent,
  AdFooter,
  ActionButton,
  ActionButtonText,
  LoadingContainer,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
  FAB,
  FABIcon,
} from "./style";

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  providerId: number;
  imageUrl?: string;
}

interface AdFormData {
  id?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
}

const categories = [
  "Pedreiro",
  "Pintor",
  "Eletricista",
  "Encanador",
  "Montador de Móveis",
  "Jardineiro",
  "Diarista / Limpeza",
  "Fretes e Carretos",
  "Outro",
];

const AdsProviderScreen: React.FC = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editingAd, setEditingAd] = useState<AdFormData | null>(null);

  const fetchAds = useCallback(async () => {
    try {
      const response = await api.get("/ads/provider/my-ads");
      setAds(response.data.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Alert.alert(
        "Erro ao buscar anúncios",
        err.response?.data?.message || "Não foi possível carregar os dados."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAds();
    }
  }, [user, fetchAds]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAds();
  }, [fetchAds]);

  const handleOpenCreateModal = () => {
    setEditingAd(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (ad: Ad) => {
    setEditingAd({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      category: ad.category,
      image: ad.imageUrl || null,
    });
    setModalVisible(true);
  };

  const handleSaveAd = async (adData: AdFormData) => {
    if (!adData.title.trim() || !adData.category || adData.price <= 0) {
      Alert.alert("Atenção", "Título, categoria e preço são obrigatórios.");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", adData.title.trim());
      formData.append("description", adData.description.trim());
      formData.append("price", String(adData.price));
      formData.append("category", adData.category);

      // ✅ Upload de imagem: só envia se for uma URI local (nova imagem)
      if (adData.image && adData.image.startsWith("file://")) {
        console.log("📸 Enviando nova imagem:", adData.image);

        const uriParts = adData.image.split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();
        const mimeType = fileType === "png" ? "image/png" : "image/jpeg";

        formData.append("image", {
          uri: adData.image,
          name: `service_${Date.now()}.${fileType}`,
          type: mimeType,
        } as any);
      } else if (adData.image && adData.image.startsWith("http")) {
        console.log("🔗 Mantendo imagem existente:", adData.image);
        // Se for URL de servidor, não envia a imagem novamente
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (adData.id) {
        console.log("✏️ Atualizando anúncio ID:", adData.id);
        await api.put(`/ads/${adData.id}`, formData, config);
        Alert.alert("✅ Sucesso!", "Anúncio atualizado com sucesso.");
      } else {
        console.log("➕ Criando novo anúncio");
        await api.post("/ads", formData, config);
        Alert.alert("✅ Sucesso!", "Anúncio criado com sucesso.");
      }

      setModalVisible(false);
      setEditingAd(null);
      fetchAds();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("❌ Erro ao salvar:", err);
      Alert.alert(
        "Erro ao Salvar",
        err.response?.data?.message || "Não foi possível salvar o anúncio."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAd = (id: number, title: string) => {
    Alert.alert("Confirmar Exclusão", `Deseja deletar o anúncio "${title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/ads/${id}`);
            Alert.alert("✅ Sucesso!", "Anúncio deletado.");
            setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            Alert.alert(
              "❌ Erro ao Deletar",
              err.response?.data?.message ||
                "Não foi possível deletar o anúncio."
            );
          }
        },
      },
    ]);
  };

  const renderAd = useCallback(
    ({ item }: { item: Ad }) => (
      <AdCard>
        {item.imageUrl && (
          <AdImage source={{ uri: item.imageUrl }} resizeMode="cover" />
        )}
        <AdContent>
          <AdTitle>{item.title}</AdTitle>
          <AdCategory>{item.category}</AdCategory>
          <AdDescription numberOfLines={2}>{item.description}</AdDescription>
          <AdPrice>R$ {item.price.toFixed(2).replace(".", ",")}</AdPrice>

          <AdFooter>
            <ActionButton edit onPress={() => handleOpenEditModal(item)}>
              <Feather name="edit-2" size={16} color={theme.COLORS.WHITE} />
              <ActionButtonText>Editar</ActionButtonText>
            </ActionButton>
            <ActionButton
              delete
              onPress={() => handleDeleteAd(item.id, item.title)}
            >
              <Feather name="trash-2" size={16} color={theme.COLORS.WHITE} />
              <ActionButtonText>Excluir</ActionButtonText>
            </ActionButton>
          </AdFooter>
        </AdContent>
      </AdCard>
    ),
    []
  );

  const renderEmptyList = useCallback(
    () => (
      <EmptyContainer>
        <Feather name="clipboard" size={64} color={theme.COLORS.BLUE_400} />
        <EmptyText>Nenhum anúncio encontrado</EmptyText>
        <EmptySubtext>
          Toque no botão + para criar seu primeiro anúncio
        </EmptySubtext>
      </EmptyContainer>
    ),
    []
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.COLORS.BLUE_400} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.COLORS.BLUE_400}
      />
      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/provider.png")} />
          <HeaderTitle>Gerenciar Anúncios</HeaderTitle>
        </HeaderContent>
      </Header>

      <ContentContainer>
        <Subtitle>Seus serviços anunciados:</Subtitle>
        <FlatList
          data={ads}
          renderItem={renderAd}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.COLORS.BLUE_400]}
              tintColor={theme.COLORS.BLUE_400}
            />
          }
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        />
      </ContentContainer>

      <FAB onPress={handleOpenCreateModal}>
        <FABIcon name="plus" size={24} color={theme.COLORS.WHITE} />
      </FAB>

      <AdFormModal
        visible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingAd(null);
        }}
        onSave={handleSaveAd}
        isSaving={isSaving}
        initialData={editingAd}
        categories={categories}
      />
    </Container>
  );
};

export default AdsProviderScreen;
