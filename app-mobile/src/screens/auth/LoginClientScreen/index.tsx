import React, { useState } from "react";
import { StatusBar, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

// Contexts & Hooks
import { useAuth } from "../../../contexts/AuthContext";

// Components
import { BackButton } from "../../../components/BackButton";

// Styles
import {
  Container,
  Header,
  FormContainer,
  HeaderContent,
  Logo,
  HeaderTitle,
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
  SocialButton,
  SignUpContainer,
  SignUpText,
  SignUpLink,
} from "./styles";

import { LoginClientNavigationProp, LoginCredentials } from "./types";

const LoginClienteScreen: React.FC = () => {
  const navigation = useNavigation<LoginClientNavigationProp>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }

    setIsLoading(true);

    try {
      const credentials: LoginCredentials = {
        email: email.trim(),
        password: password,
      };

      await signIn(credentials, "client");
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Erro de Login",
        error.message || "Usuário ou senha inválidos. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Em breve", "Funcionalidade sendo trabalhada!");
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#df692b" />
      <BackButton />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/logo.png")} />
          <HeaderTitle>
            Sua necessidade a um clique de ser resolvida.
          </HeaderTitle>
        </HeaderContent>
      </Header>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormContainer>
          <Subtitle>Bem-vindo de volta!</Subtitle>

          {/* Input de Email */}
          <InputContainer>
            <Feather name="mail" size={20} color="#df692b" />
            <StyledInput
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              returnKeyType="next"
            />
          </InputContainer>

          {/* Input de Senha */}
          <InputContainer>
            <Feather name="lock" size={20} color="#df692b" />
            <StyledInput
              placeholder="Digite sua senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ padding: 5 }}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#df692b"
              />
            </TouchableOpacity>
          </InputContainer>

          <TouchableOpacity onPress={handleForgotPassword}>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
          </TouchableOpacity>

          <LoginButton onPress={handleLogin} disabled={isLoading}>
            <ButtonText>{isLoading ? "Entrando..." : "Entrar"}</ButtonText>
          </LoginButton>

          <DividerContainer>
            <DividerLine />
            <DividerText>ou continue com</DividerText>
            <DividerLine />
          </DividerContainer>

          <SocialLoginContainer>
            <SocialButton>
              <AntDesign name="google" size={24} color="#df692b" />
            </SocialButton>
            <SocialButton>
              <FontAwesome name="apple" size={24} color="#df692b" />
            </SocialButton>
            <SocialButton>
              <FontAwesome name="facebook" size={24} color="#df692b" />
            </SocialButton>
          </SocialLoginContainer>

          <SignUpContainer>
            <SignUpText>Não tem uma conta? </SignUpText>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterClient")}
            >
              <SignUpLink>Cadastre-se aqui</SignUpLink>
            </TouchableOpacity>
          </SignUpContainer>
        </FormContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LoginClienteScreen;
