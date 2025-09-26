import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  RegisterProviderStep2: {
    name: string;
    cnpj: string;
    email: string;
    password: string;
  };
};

type RegisterProviderScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterProviderStep2"
>;

interface NavigationProps extends RegisterProviderScreenProp {}

const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
};

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

const capitalizeName = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatCNPJ = (value: string): string => {
  const cnpj = value.replace(/\D/g, "");

  if (cnpj.length <= 2) return cnpj;
  if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
  if (cnpj.length <= 8)
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
  if (cnpj.length <= 12)
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
      5,
      8
    )}/${cnpj.slice(8)}`;
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
    5,
    8
  )}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
};

const RegisterProvider: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleRegister = (): void => {
    if (!name || !cnpj || !email || !password || !confirmPassword) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    if (!isValidCNPJ(cnpj)) {
      Alert.alert("CNPJ inválido", "Por favor, insira um CNPJ válido.");
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

    setIsLoading(true);

    setTimeout(() => {
      navigation.navigate("RegisterProviderStep2", {
        name,
        cnpj: cnpj.replace(/\D/g, ""),
        email,
        password,
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />
      <BackButton />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/provider.png")} />
          <HeaderTitle>
            Ofereça seus serviços e encontre novos clientes.
          </HeaderTitle>
        </HeaderContent>
      </Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormContainer>
            <Subtitle>Dados da empresa</Subtitle>

            <InputContainer>
              <Feather name="user" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Nome completo ou Razão Social"
                value={name}
                onChangeText={(text) => setName(capitalizeName(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="shield" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Digite o CNPJ"
                keyboardType="number-pad"
                maxLength={18}
                value={cnpj}
                onChangeText={(text) => setCnpj(formatCNPJ(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="mail" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
                editable={!isLoading}
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

            <InputContainer>
              <Feather name="lock" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Confirme sua senha"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ padding: 5 }}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#57b2c5"
                />
              </TouchableOpacity>
            </InputContainer>

            <RegisterButton onPress={handleRegister} disabled={isLoading}>
              <ButtonText>
                {isLoading ? "Processando..." : "Continuar"}
              </ButtonText>
            </RegisterButton>

            <LoginContainer>
              <LoginText>Já tem uma conta? </LoginText>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LoginLink>Entrar aqui</LoginLink>
              </TouchableOpacity>
            </LoginContainer>
          </FormContainer>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterProvider;
