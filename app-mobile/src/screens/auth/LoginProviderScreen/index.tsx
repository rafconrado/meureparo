import React, { useState, useRef } from "react";
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
import { loginProvider } from "../../../services/authService";

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

const LoginProviderScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProps>();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginProvider(email, password);

      if (response && response.user && response.token) {
        const userToSignIn = {
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        };

        await signIn(userToSignIn, "provider");
        Alert.alert("Sucesso", "Login realizado com sucesso!");
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
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />
      <BackButton />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/logo.png")} />
          <HeaderTitle>
            Conectando você a novas oportunidades.
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
            <Subtitle>Bem-vindo, prestador!</Subtitle>

            <InputContainer>
              <Feather name="mail" size={20} color="#57b2c5" />
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
              <Feather name="lock" size={20} color="#57b2c5" />
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
                  color="#57b2c5" 
                />
              </TouchableOpacity>
            </InputContainer>

            <TouchableOpacity>
              <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            </TouchableOpacity>

            <LoginButton onPress={handleLogin} disabled={isLoading}>
              <ButtonText>
                {isLoading ? "Entrando..." : "Entrar"}
              </ButtonText>
            </LoginButton>

            <DividerContainer>
              <DividerLine />
              <DividerText>ou continue com</DividerText>
              <DividerLine />
            </DividerContainer>

            <SocialLoginContainer>
              <SocialButton>
                <AntDesign name="google" size={24} color="#57b2c5" />
              </SocialButton>
              <SocialButton>
                <FontAwesome name="apple" size={24} color="#57b2c5" />
              </SocialButton>
              <SocialButton>
                <FontAwesome name="facebook" size={24} color="#57b2c5" />
              </SocialButton>
            </SocialLoginContainer>

            <SignUpContainer>
              <SignUpText>Não tem uma conta? </SignUpText>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterProvider")}
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

export default LoginProviderScreen;