import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../../contexts/AuthContext";

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
  const { signIn } = useAuth();
  const navigation = useNavigation();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }

    try {
      const user = {
        name: "Prestador Simulado",
        email,
        token: "token_simulado",
      };
      await signIn(user, "provider");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha no login");
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

            <TouchableOpacity onPress={handleLogin}>
              <LoginButton>
                <ButtonText>Login</ButtonText>
              </LoginButton>
            </TouchableOpacity>

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
              <Logo source={require("../../assets/images/logo.png")} />
              <FooterTitle>Conectando você a novas oportunidades.</FooterTitle>
            </FooterContent>
          </BlueFooter>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginProviderScreen;
