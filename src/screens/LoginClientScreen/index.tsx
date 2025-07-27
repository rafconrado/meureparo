import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  SignUpContainer,
  SignUpText,
  SignUpLink,
} from "./style";

import { AntDesign, Feather } from "@expo/vector-icons";

import { BackButton } from "../../components/BackButton";

const LoginClienteScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#df692b" />

      <BackButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header>
            <HeaderContent>
              <Logo source={require("../../assets/images/logo.png")} />
              <HeaderTitle>
                Sua necessidade a um clique de ser resolvida.
              </HeaderTitle>
            </HeaderContent>
          </Header>

          <FormContainer>
            <Subtitle>Login para clientes:</Subtitle>

            <InputContainer>
              <Feather name="user" size={20} color="white" />
              <StyledInput placeholder="E-mail" keyboardType="email-address" />
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="white" />
              <StyledInput placeholder="Senha" secureTextEntry />
            </InputContainer>

            <TouchableOpacity>
              <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            </TouchableOpacity>

            <LoginButton>
              <ButtonText>Login</ButtonText>
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
                <AntDesign name="apple1" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="facebook-square" size={30} color="#000000" />
              </TouchableOpacity>
            </SocialLoginContainer>

            <SignUpContainer>
              <SignUpText>Não tem uma conta?</SignUpText>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterClient" as never)}
              >
                <SignUpLink>Cadastre-se</SignUpLink>
              </TouchableOpacity>
            </SignUpContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginClienteScreen;
