import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../../contexts/AuthContext";
// 2. Importa a função de login REAL do seu serviço de API
import { loginProvider } from "../../../services/authService";

import {
  Container,
  FormContainer,
  BlueFooter,
  Subtitle,
  InputContainer,
  StyledInput,
  ForgotPasswordText,
  LoginButton,
  ButtonText,
  DividerContainer,
  DividerLine,
  DividerText,
  SocialLoginContainer,
  FooterContent,
  Logo,
  FooterTitle,
  SignUpContainer,
  SignUpText,
  SignUpLink,
} from "./style";

import { AntDesign, Feather } from "@expo/vector-icons";
import { BackButton } from "../../../components/BackButton";

const LoginProviderScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 3. Estado para controlar o loading
  const { signIn } = useAuth();
  const navigation = useNavigation();

  // 4. Esta é a função CORRIGIDA que se comunica com o backend
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
      return;
    }

    setLoading(true); // Inicia o indicador de carregamento

    try {
      // CHAMA A API REAL para verificar as credenciais no backend
      console.log(`-> [TELA] Tentando fazer login com o e-mail: ${email}`);
      const response = await loginProvider(email, password);

      // A resposta da API contém o usuário (`response.user`) e o token (`response.token`)
      if (response && response.user && response.token) {
        // Monta o objeto UserData que a função signIn espera
        const userToSignIn = {
          name: response.user.name,
          email: response.user.email,
          token: response.token, // Usa o token JWT real vindo da API
        };

        // Agora sim, faz o login no app com os dados VALIDADOS
        await signIn(userToSignIn, "provider");
        console.log("<- [TELA] Login realizado com sucesso!");
      } else {
        throw new Error("Resposta do servidor inválida.");
      }
    } catch (error: any) {
      console.error(
        "################ ERRO DETALHADO NO LOGIN ################"
      );
      // Mostra a mensagem de erro que veio da API (ex: "Usuário ou senha inválidos.")
      Alert.alert("Erro no Login", error.message);
    } finally {
      setLoading(false); // Para o indicador de carregamento, mesmo se der erro
    }
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff8ec" />
      <BackButton color="#57b2c5" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <FormContainer>
            <Subtitle>Sou prestador:</Subtitle>

            <InputContainer>
              <Feather name="user" size={20} color="white" />
              <StyledInput
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="white" />
              <StyledInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </InputContainer>

            <TouchableOpacity>
              <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            </TouchableOpacity>

            {/* 5. Botão modificado para mostrar o loading */}
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <LoginButton>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <ButtonText>Login</ButtonText>
                )}
              </LoginButton>
            </TouchableOpacity>

            {/* ...O resto do seu JSX continua aqui... */}
            <DividerContainer>
              <DividerLine />
              <DividerText>Login com:</DividerText>
              <DividerLine />
            </DividerContainer>
            <SocialLoginContainer>
              <TouchableOpacity>
                <AntDesign name="google" size={30} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="apple1" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="facebook-square" size={30} color="#000000" />
              </TouchableOpacity>
            </SocialLoginContainer>
            <SignUpContainer>
              <SignUpText>Não tem uma conta?</SignUpText>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterProvider" as never)}
              >
                <SignUpLink>Cadastre-se</SignUpLink>
              </TouchableOpacity>
            </SignUpContainer>
          </FormContainer>
          <BlueFooter>
            <FooterContent>
              <Logo source={require("../../../assets/images/logo.png")} />
              <FooterTitle>Conectando você a novas oportunidades.</FooterTitle>
            </FooterContent>
          </BlueFooter>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginProviderScreen;
