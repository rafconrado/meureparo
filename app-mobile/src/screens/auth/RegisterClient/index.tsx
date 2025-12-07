import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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

import { RegisterClientNavigationProp } from "./types";

// ==============================
// FUNÇÕES AUXILIARES
// ==============================
const capitalizeName = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const isValidCPF = (cpf: string): boolean => {
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

const formatCPF = (value: string): string => {
  const cpf = value.replace(/\D/g, "");

  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9)
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9,
    11
  )}`;
};

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
const RegisterClient: React.FC = () => {
  const navigation = useNavigation<RegisterClientNavigationProp>();

  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [isCpfValid, setIsCpfValid] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);

    const rawCpf = formattedCpf.replace(/[^\d]/g, "");

    if (rawCpf.length === 11) {
      setIsCpfValid(isValidCPF(rawCpf));
    } else {
      setIsCpfValid(null);
    }
  };

  const handleRegister = (): void => {
    if (!name || !cpf || !email || !password || !confirmPassword) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    if (isCpfValid === false || !isValidCPF(cpf)) {
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

    setIsLoading(true);

    setTimeout(() => {
      navigation.navigate("RegisterClientStep2", {
        name,
        cpf: cpf.replace(/\D/g, ""),
        email,
        password,
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#df692b" />
      <BackButton />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/logo.png")} />
          <HeaderTitle>
            Cadastre-se para encontrar o profissional certo para você.
          </HeaderTitle>
        </HeaderContent>
      </Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormContainer>
            <Subtitle>Dados pessoais</Subtitle>

            <InputContainer>
              <Feather name="user" size={20} color="#df692b" />
              <StyledInput
                placeholder="Digite seu nome completo"
                value={name}
                onChangeText={(text) => setName(capitalizeName(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="shield" size={20} color="#df692b" />

              <StyledInput
                placeholder="Digite seu CPF"
                keyboardType="number-pad"
                maxLength={14}
                value={cpf}
                onChangeText={handleCpfChange}
                returnKeyType="next"
                editable={!isLoading}
              />
              {isCpfValid === true && (
                <Feather name="check-circle" size={20} color="#28a745" />
              )}
              {isCpfValid === false && (
                <Feather name="x-circle" size={20} color="#dc3545" />
              )}
            </InputContainer>

            {isCpfValid === false && (
              <LoginText
                style={{
                  color: "#dc3545",
                  marginTop: -10,
                  marginBottom: 10,
                  marginLeft: 15,
                }}
              >
                CPF inválido
              </LoginText>
            )}

            <InputContainer>
              <Feather name="mail" size={20} color="#df692b" />
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
              <Feather name="lock" size={20} color="#df692b" />
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
                  color="#df692b"
                />
              </TouchableOpacity>
            </InputContainer>

            <InputContainer>
              <Feather name="lock" size={20} color="#df692b" />
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
                  color="#df692b"
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
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginClient")}
              >
                <LoginLink>Entrar aqui</LoginLink>
              </TouchableOpacity>
            </LoginContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterClient;
