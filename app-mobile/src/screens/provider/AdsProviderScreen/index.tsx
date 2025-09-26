import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// 1. Importe sua instância do Axios
import api from "../../../services/api"; // <-- AJUSTE O CAMINHO SE NECESSÁRIO

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
  AdFooter,
  ActionButton,
  ActionButtonText,
  LoadingContainer,
  LoadingText,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
  FAB,
  FABIcon,
  ModalContainer,
  ModalContent,
  ModalTitle,
  InputContainer,
  StyledInput,
  TextArea,
  CategoryPicker,
  CategoryPickerText,
  SaveButton,
  SaveButtonText,
  CancelButton,
  CancelButtonText,
  CategoryModal,
  CategoryOption,
  CategoryOptionText,
} from "./style";
import { AxiosError } from "axios";

// --- TIPOS ---
interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  providerId: number;
  providerName?: string;
}

const categories = [
  "Pintura",
  "Encanamento",
  "Elétrica",
  "Montagem",
  "Pedreiro",
  "Limpeza",
  "Jardinagem",
  "Marcenaria",
  "Outro",
];

const initialAdState: Omit<Ad, "id" | "providerId"> = {
  title: "",
  description: "",
  price: 0,
  category: "",
};

const AdsProviderScreen: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isCategoryModalVisible, setCategoryModalVisible] =
    useState<boolean>(false);
  const [currentAd, setCurrentAd] = useState(initialAdState);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const fetchAds = useCallback(async () => {
    try {
      const response = await api.get("/ads");
      setAds(response.data);
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
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAds();
  }, [fetchAds]);

  const handleOpenCreateModal = (): void => {
    setEditingAdId(null);
    setCurrentAd(initialAdState);
    setModalVisible(true);
  };

  const handleOpenEditModal = (ad: Ad): void => {
    setEditingAdId(ad.id);
    setCurrentAd({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      category: ad.category,
    });
    setModalVisible(true);
  };

  // 3. CORRIGIDO: Função para salvar (criar/editar) usando a instância 'api'
  const handleSaveAd = async (): Promise<void> => {
    if (
      !currentAd.title.trim() ||
      !currentAd.category ||
      currentAd.price <= 0
    ) {
      Alert.alert("Atenção", "Título, categoria e preço são obrigatórios.");
      return;
    }

    setIsSaving(true);

    try {
      if (editingAdId) {
        // ATUALIZAR anúncio existente
        await api.put(`/ads/${editingAdId}`, currentAd);
      } else {
        // CRIAR novo anúncio
        await api.post("/ads", currentAd);
      }

      Alert.alert(
        "Sucesso!",
        `Anúncio ${editingAdId ? "atualizado" : "criado"} com sucesso.`
      );
      setModalVisible(false);
      fetchAds(); // Atualiza a lista após salvar
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Alert.alert(
        "Erro ao Salvar",
        err.response?.data?.message || "Não foi possível salvar o anúncio."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 4. CORRIGIDO: Função para deletar usando a instância 'api'
  const handleDeleteAd = (id: number): void => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar este anúncio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              // O token também é adicionado automaticamente aqui
              await api.delete(`/ads/${id}`);

              Alert.alert("Sucesso!", "Anúncio deletado.");
              fetchAds(); // Atualiza a lista
            } catch (error) {
              const err = error as AxiosError<{ message: string }>;
              Alert.alert(
                "Erro ao Deletar",
                err.response?.data?.message ||
                  "Não foi possível deletar o anúncio."
              );
            }
          },
        },
      ]
    );
  };

  const selectCategory = (category: string): void => {
    setCurrentAd({ ...currentAd, category });
    setCategoryModalVisible(false);
  };

  const formatPrice = (price: string): string => {
    const numericValue = price.replace(/[^\d,]/g, "").replace(",", ".");
    return numericValue;
  };

  const renderAd = ({ item }: { item: Ad }) => (
    <AdCard>
      <AdTitle>{item.title}</AdTitle>
      <AdCategory>{item.category}</AdCategory>
      <AdDescription numberOfLines={2}>{item.description}</AdDescription>
      <AdPrice>R$ {item.price.toFixed(2).replace(".", ",")}</AdPrice>

      <AdFooter>
        <ActionButton edit onPress={() => handleOpenEditModal(item)}>
          <Feather name="edit-2" size={16} color="#ffffff" />
          <ActionButtonText>Editar</ActionButtonText>
        </ActionButton>

        <ActionButton delete onPress={() => handleDeleteAd(item.id)}>
          <Feather name="trash-2" size={16} color="#ffffff" />
          <ActionButtonText>Excluir</ActionButtonText>
        </ActionButton>
      </AdFooter>
    </AdCard>
  );

  const renderEmptyList = () => (
    <EmptyContainer>
      <Feather name="clipboard" size={64} color="#57b2c5" />
      <EmptyText>Nenhum anúncio encontrado</EmptyText>
      <EmptySubtext>
        Toque no botão + para criar seu primeiro anúncio
      </EmptySubtext>
    </EmptyContainer>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/provider.png")} />
          <HeaderTitle>Gerenciar Anúncios</HeaderTitle>
        </HeaderContent>
      </Header>

      <ContentContainer>
        <Subtitle>Seus serviços anunciados:</Subtitle>

        {loading ? (
          <LoadingContainer>
            <Feather name="loader" size={32} color="#57b2c5" />
            <LoadingText>Carregando anúncios...</LoadingText>
          </LoadingContainer>
        ) : (
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
                colors={["#57b2c5"]}
                tintColor="#57b2c5"
              />
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 100,
            }}
          />
        )}
      </ContentContainer>

      <FAB onPress={handleOpenCreateModal}>
        <FABIcon name="plus" size={24} color="#ffffff" />
      </FAB>

      {/* Modal Criar/Editar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>
              {editingAdId ? "Editar Anúncio" : "Novo Anúncio"}
            </ModalTitle>

            <InputContainer>
              <Feather name="type" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Título do serviço"
                value={currentAd.title}
                onChangeText={(text) =>
                  setCurrentAd({ ...currentAd, title: text })
                }
                editable={!isSaving}
              />
            </InputContainer>

            <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
              <CategoryPicker>
                <Feather name="tag" size={20} color="#57b2c5" />
                <CategoryPickerText selected={!!currentAd.category}>
                  {currentAd.category || "Selecione uma categoria"}
                </CategoryPickerText>
                <Feather name="chevron-down" size={20} color="#57b2c5" />
              </CategoryPicker>
            </TouchableOpacity>

            <InputContainer>
              <Feather name="dollar-sign" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Preço (ex: 150,00)"
                value={
                  currentAd.price > 0
                    ? String(currentAd.price).replace(".", ",")
                    : ""
                }
                onChangeText={(text) =>
                  setCurrentAd({
                    ...currentAd,
                    price: parseFloat(formatPrice(text)) || 0,
                  })
                }
                keyboardType="numeric"
                editable={!isSaving}
              />
            </InputContainer>

            <TextArea
              placeholder="Descrição do serviço..."
              value={currentAd.description}
              onChangeText={(text) =>
                setCurrentAd({ ...currentAd, description: text })
              }
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!isSaving}
            />

            <SaveButton onPress={handleSaveAd} disabled={isSaving}>
              <SaveButtonText>
                {isSaving ? "Salvando..." : "Salvar Anúncio"}
              </SaveButtonText>
            </SaveButton>

            <CancelButton
              onPress={() => setModalVisible(false)}
              disabled={isSaving}
            >
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
          </ModalContent>
        </ModalContainer>
      </Modal>

      {/* Modal Categorias */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <CategoryModal>
          <ModalContent>
            <ModalTitle>Selecione a Categoria</ModalTitle>
            {categories.map((category) => (
              <CategoryOption
                key={category}
                onPress={() => selectCategory(category)}
              >
                <CategoryOptionText>{category}</CategoryOptionText>
                <Feather name="chevron-right" size={20} color="#57b2c5" />
              </CategoryOption>
            ))}

            <CancelButton onPress={() => setCategoryModalVisible(false)}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
          </ModalContent>
        </CategoryModal>
      </Modal>
    </Container>
  );
};

export default AdsProviderScreen;
