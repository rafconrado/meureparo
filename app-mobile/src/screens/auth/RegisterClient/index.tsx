import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  HeaderContent,
  Logo,
  HeaderTitle,
  FormContainer,
  Subtitle,
  InputContainer,
  StyledInput,
  RegisterButton,
  ButtonText,
  LoginContainer,
  LoginText,
  LoginLink,
} from "./style";

import { BackButton } from "../../../components/BackButton";

type RootStackParamList = {
  RegisterClientStep2: {
    name: string;
    cpf: string;
    email: string;
    password: string;
  };
};

type RegisterClientScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterClientStep2"
>;

const capitalizeName = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

const formatCPF = (value: string) => {
  const cpf = value.replace(/\D/g, ""); // remove tudo que não é número

  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9)
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9,
    11
  )}`;
};

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

const RegisterClient = () => {
  const navigation = useNavigation<RegisterClientScreenProp>();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !cpf || !email || !password || !confirmPassword) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    if (!isValidCPF(cpf)) {
      Alert.alert("CPF inválido", "Por favor, insira um CPF válido.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("E-mail inválido", "Por favor, insira um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha inválida", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Senhas diferentes", "As senhas não coincidem.");
      return;
    }

    navigation.navigate("RegisterClientStep2", {
      name,
      cpf,
      email,
      password,
    });
  };

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
              <Logo source={require("../../../assets/images/logo.png")} />
              <HeaderTitle>
                Cadastre-se para encontrar o profissional certo para você.
              </HeaderTitle>
            </HeaderContent>
          </Header>

          <FormContainer>
            <Subtitle>Cadastro de cliente:</Subtitle>

            <InputContainer>
              <Feather name="user" size={20} color="white" />
              <StyledInput
                placeholder="Nome completo"
                value={name}
                onChangeText={(text) => setName(capitalizeName(text))}
                returnKeyType="next"
              />
            </InputContainer>

            <InputContainer>
              <Feather name="shield" size={20} color="white" />
              <StyledInput
                placeholder="CPF"
                keyboardType="number-pad"
                maxLength={14}
                value={cpf}
                onChangeText={(text) => setCpf(formatCPF(text))}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="mail" size={20} color="white" />
              <StyledInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="white" />
              <StyledInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
              />
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="white" />
              <StyledInput
                placeholder="Confirme a senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
              />
            </InputContainer>

            <RegisterButton onPress={handleRegister}>
              <ButtonText>Próximo</ButtonText>
            </RegisterButton>

            <LoginContainer>
              <LoginText>Já tem uma conta?</LoginText>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LoginLink>Entrar</LoginLink>
              </TouchableOpacity>
            </LoginContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterClient;
