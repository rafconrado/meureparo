import React, { useState, useRef } from "react";
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../../contexts/AuthContext";
import { loginClient as loginService } from "../../../services/authService";

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
} from "./style";

import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { BackButton } from "../../../components/BackButton";

interface NavigationProps {
  navigate: (screen: string) => void;
}

const LoginClienteScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProps>();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }

    setIsLoading(true);

    try {
      const apiResponse = await loginService(email, password);

      const userData = {
        ...apiResponse.user,
        token: apiResponse.token,
      };

      await signIn(userData, "client");
      Alert.alert("Sucesso", "Login realizado!");
    } catch (error: any) {
      Alert.alert(
        "Erro de Login",
        error.message || "Usuário ou senha inválidos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (): void => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormContainer>
            <Subtitle>Bem-vindo de volta!</Subtitle>

            <InputContainer>
              <Feather name="mail" size={20} color="#df692b" />
              <StyledInput
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                editable={!isLoading}
                returnKeyType="next"
                onFocus={handleInputFocus}
              />
            </InputContainer>

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
                onFocus={handleInputFocus}
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

            <TouchableOpacity>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginClienteScreen;
