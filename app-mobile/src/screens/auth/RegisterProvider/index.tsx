import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Styles
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
  SwitchContainer,
  SwitchLabel,
} from "./styles";

// Components
import { BackButton } from "../../../components/BackButton";

// Types
import { RegisterProviderStep1NavigationProp } from "./types";

// ==============================
// FUNÇÕES AUXILIARES
// ==============================
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

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
const RegisterProviderStep1: React.FC = () => {
  const navigation = useNavigation<RegisterProviderStep1NavigationProp>();

  // Estados dos Campos
  const [razaoSocial, setRazaoSocial] = useState<string>("");
  const [nomeFantasia, setNomeFantasia] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");

  // Lógica de ICMS
  const [isContribuinteICMS, setIsContribuinteICMS] = useState<boolean>(false);
  const [inscricaoEstadual, setInscricaoEstadual] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleNextStep = (): void => {
    if (
      !razaoSocial ||
      !nomeFantasia ||
      !cnpj ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (isContribuinteICMS && !inscricaoEstadual) {
      Alert.alert(
        "Atenção",
        "Informe a Inscrição Estadual ou desmarque a opção de contribuinte."
      );
      return;
    }

    if (!isValidCNPJ(cnpj)) {
      Alert.alert("Inválido", "O CNPJ informado não é válido.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Inválido", "O e-mail informado não é válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas digitadas não coincidem.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      navigation.navigate("RegisterProviderStep2", {
        razaoSocial,
        nomeFantasia,
        cnpj: cnpj.replace(/\D/g, ""),
        inscricaoEstadual: isContribuinteICMS ? inscricaoEstadual : "",
        email,
        password,
      });
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
            <Subtitle>Dados da Empresa</Subtitle>

            {/* Razão Social */}
            <InputContainer>
              <Feather name="briefcase" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Razão Social"
                value={razaoSocial}
                onChangeText={(text) => setRazaoSocial(capitalizeName(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            {/* Nome Fantasia */}
            <InputContainer>
              <Feather name="tag" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Nome Fantasia"
                value={nomeFantasia}
                onChangeText={(text) => setNomeFantasia(capitalizeName(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            {/* CNPJ */}
            <InputContainer>
              <Feather name="shield" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="CNPJ"
                keyboardType="number-pad"
                maxLength={18}
                value={cnpj}
                onChangeText={(text) => setCnpj(formatCNPJ(text))}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            {/* Switch Contribuinte ICMS */}
            <SwitchContainer>
              <SwitchLabel>Contribuinte de ICMS?</SwitchLabel>
              <Switch
                trackColor={{ false: "#767577", true: "#81d4e3" }}
                thumbColor={isContribuinteICMS ? "#57b2c5" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsContribuinteICMS}
                value={isContribuinteICMS}
                disabled={isLoading}
              />
            </SwitchContainer>

            {/* Inscrição Estadual (Condicional) */}
            {isContribuinteICMS && (
              <InputContainer>
                <Feather name="file-text" size={20} color="#57b2c5" />
                <StyledInput
                  placeholder="Inscrição Estadual"
                  keyboardType="number-pad"
                  value={inscricaoEstadual}
                  maxLength={14}
                  onChangeText={(text) =>
                    setInscricaoEstadual(text.replace(/\D/g, ""))
                  }
                  returnKeyType="next"
                  editable={!isLoading}
                />
              </InputContainer>
            )}

            {/* Email */}
            <InputContainer>
              <Feather name="mail" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            {/* Senha */}
            <InputContainer>
              <Feather name="lock" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Senha"
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

            {/* Confirmar Senha */}
            <InputContainer>
              <Feather name="lock" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Confirme a senha"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
                onSubmitEditing={handleNextStep}
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

            <RegisterButton onPress={handleNextStep} disabled={isLoading}>
              <ButtonText>
                {isLoading ? "Validando..." : "Continuar"}
              </ButtonText>
            </RegisterButton>

            <LoginContainer>
              <LoginText>Já tem uma conta? </LoginText>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginProvider")}
              >
                <LoginLink>Entrar aqui</LoginLink>
              </TouchableOpacity>
            </LoginContainer>
          </FormContainer>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterProviderStep1;
