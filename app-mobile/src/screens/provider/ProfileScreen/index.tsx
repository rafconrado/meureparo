import React, { useState, useEffect } from "react";
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
} from "./style";
import { useAuth } from "../../../contexts/AuthContext";
import { Alert } from "react-native";

export default function ProfileScreen() {
  const { user, userType, signOut, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUser({ name, email });
      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (error) {
      console.error("Erro na tela ao tentar salvar:", error);
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o perfil. Tente novamente."
      );
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setIsEditing(false);
  };

  return (
    <Container>
      <Title>Meu Perfil</Title>

      <Card>
        <Label>Nome:</Label>
        {isEditing ? (
          <Input value={name} onChangeText={setName} />
        ) : (
          <Value>{name}</Value>
        )}

        <Label>E-mail:</Label>
        {isEditing ? (
          <Input
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        ) : (
          <Value>{email}</Value>
        )}

        <Label>Tipo de Usuário:</Label>
        {/* Este campo agora funcionará sem erros */}
        <Value>{userType === "client" ? "Cliente" : "Prestador"}</Value>
      </Card>

      {isEditing ? (
        <ButtonContainer>
          <Button onPress={handleSave} style={{ flex: 1, marginRight: 10 }}>
            <ButtonText>Salvar</ButtonText>
          </Button>
          <Button
            onPress={handleCancel}
            style={{ flex: 1, backgroundColor: "#888" }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </ButtonContainer>
      ) : (
        <>
          <Button onPress={() => setIsEditing(true)}>
            <ButtonText>Editar Perfil</ButtonText>
          </Button>
          <Button
            onPress={signOut}
            style={{ marginTop: 15, backgroundColor: "#c93c3c" }}
          >
            <ButtonText>Sair da conta</ButtonText>
          </Button>
        </>
      )}
    </Container>
  );
}
