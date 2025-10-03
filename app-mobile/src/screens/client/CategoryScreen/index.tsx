import React, { useState, useEffect, useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { Provider } from "../../../types";
import api from "../../../services/api";

import { FeaturedProviderCard } from "../HomeClient/components/FeaturedProviderCard";
import {
    Container,
    Title,
    LoadingContainer,
    ErrorText,
    EmptyListContainer,
    EmptyListText,
} from "./style";

const CategoryScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { categoryId, categoryName } = route.params;

    const [providers, setProviders] = useState<Provider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProvidersByCategory = async () => {
            if (!categoryId) {
                setIsLoading(false);
                setError("ID da categoria não encontrado.");
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get(`/ads?categoryId=${categoryId}`);
                setProviders(response.data);
            } catch (err) {
                console.error("Erro ao buscar provedores por categoria:", err);
                setError("Não foi possível carregar os profissionais.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProvidersByCategory();
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


    if (isLoading) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color="#ff8724" />
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <LoadingContainer>
                <ErrorText>{error}</ErrorText>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <Title>{categoryName || "Categoria"}</Title>

            <FlatList
                data={providers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <FeaturedProviderCard
                        provider={item}
                        onPress={() => handleProviderPress(item)}
                    />
                )}
                ListEmptyComponent={
                    <EmptyListContainer>
                        <EmptyListText>
                            Nenhum profissional encontrado nesta categoria.
                        </EmptyListText>
                    </EmptyListContainer>
                }
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            />
        </Container>
    );
};

export default CategoryScreen;