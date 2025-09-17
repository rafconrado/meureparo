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

import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { BackButton } from "../../../components/BackButton";

const LoginProviderScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginProvider(email, password);

      if (response && response.user && response.token) {
        const userToSignIn = {
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        };

        await signIn(userToSignIn, "provider");
        console.log("<- [TELA] Login realizado com sucesso!");
      } else {
        throw new Error("Resposta do servidor inválida.");
      }
    } catch (error: any) {
      console.error(
        "################ ERRO DETALHADO NO LOGIN ################"
      );

      Alert.alert("Erro no Login", error.message);
    } finally {
      setLoading(false);
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

            
              <LoginButton onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <ButtonText>Login</ButtonText>
                )}
              </LoginButton>
            

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
                <FontAwesome name="apple" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="facebook-square" size={30} color="#000000" />
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
