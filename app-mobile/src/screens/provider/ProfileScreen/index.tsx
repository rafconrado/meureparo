import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Card,
  Label,
  Value,
  Input, // Novo componente de estilo
  Button,
  ButtonText,
  ButtonContainer, // Novo container para os botões de ação
} from "./style";
import { useAuth } from "../../../contexts/AuthContext";

export default function ProfileScreen() {
  // 1. Obter o usuário e uma função para atualizá-lo do contexto
  const { user, userType, signOut, updateUser } = useAuth();

  // 2. Criar estados para controle de edição e dados do formulário
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 3. Carregar dados do usuário para o estado local quando o componente for montado
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]); // Este efeito roda sempre que o objeto 'user' mudar

  const handleSave = async () => {
    console.log("-> [TELA] Botão Salvar pressionado com dados:", {
      name,
      email,
    });
    try {
      if (!updateUser) {
        // Verificação de segurança
        console.error(
          "[TELA] ERRO: A função updateUser do contexto é indefinida!"
        );
        return;
      }
      console.log("[TELA] Tentando chamar updateUser do contexto...");
      await updateUser({ name, email });
      console.log("<- [TELA] updateUser do contexto executou sem erros.");
      setIsEditing(false);
    } catch (error) {
      // Este catch agora pegará erros tanto da rede (axios) quanto da lógica (contexto)
      console.error("### ERRO na TELA ao tentar salvar o perfil ###");
      console.error(error);
      // Aqui você pode adicionar um Alert para o usuário
      // Alert.alert("Erro", "Não foi possível atualizar o perfil. Tente novamente.");
    }
  };

  const handleCancel = () => {
    // Restaura os valores originais e sai do modo de edição
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
        {/* Assumindo que o tipo de usuário não é editável */}
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
