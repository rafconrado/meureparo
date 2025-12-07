import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// Context & Hooks
import { useAuth } from "../../../contexts/AuthContext";

// Styles
import {
  Container,
  Title,
  Card,
  Label,
  Value,
  Input,
  Button,
  ButtonText,
  ButtonContainer,
} from "./styles";

// Types
import { ProfileProviderNavigationProp } from "./types";

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileProviderNavigationProp>();
  const { user, userType, signOut, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Carrega os dados do usuário ao montar a tela
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Atenção", "O nome não pode ficar vazio.");
      return;
    }

    setIsLoading(true);

    try {
      await updateUser({ name });

      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o perfil. Verifique sua conexão."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setIsEditing(false);
  };

  const handleSignOut = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Meu Perfil</Title>

        <Card>
          <Label>Nome / Razão Social:</Label>
          {isEditing ? (
            <Input
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!isLoading}
            />
          ) : (
            <Value>{name}</Value>
          )}

          <Label>E-mail:</Label>
          {isEditing ? (
            <Input
              value={email}
              editable={false}
              style={{
                backgroundColor: "#f0f0f0",
                color: "#777",
                borderBottomColor: "transparent",
              }}
            />
          ) : (
            <Value>{email}</Value>
          )}

          <Label>Tipo de Conta:</Label>
          <Value style={{ color: "#57b2c5" }}>
            {userType === "client" ? "Cliente" : "Prestador de Serviço"}
          </Value>
        </Card>

        {isEditing ? (
          <ButtonContainer>
            {/* Botão Salvar */}
            <Button
              onPress={handleSave}
              disabled={isLoading}
              style={{ flex: 1, marginRight: 10, opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <ButtonText>Salvar Alterações</ButtonText>
              )}
            </Button>

            {/* Botão Cancelar */}
            <Button
              onPress={handleCancel}
              disabled={isLoading}
              style={{ flex: 1, backgroundColor: "#6c757d" }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </ButtonContainer>
        ) : (
          <>
            <Button onPress={() => setIsEditing(true)}>
              <Feather
                name="edit-2"
                size={20}
                color="#FFF"
                style={{ marginRight: 10 }}
              />
              <ButtonText>Editar Perfil</ButtonText>
            </Button>

            <Button
              onPress={handleSignOut}
              style={{ marginTop: 15, backgroundColor: "#dc3545" }}
            >
              <Feather
                name="log-out"
                size={20}
                color="#FFF"
                style={{ marginRight: 10 }}
              />
              <ButtonText>Sair da conta</ButtonText>
            </Button>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
