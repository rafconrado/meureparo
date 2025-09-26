import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../../contexts/AuthContext";

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
  StyledPicker,
  PickerContainer,
} from "./style";

import { BackButton } from "../../../components/BackButton";

const servicos = [
  { label: "Selecione um serviço", value: "" },
  { label: "Pintor", value: "pintor" },
  { label: "Encanador", value: "encanador" },
  { label: "Eletricista", value: "eletricista" },
  { label: "Montador de móveis", value: "montador" },
  { label: "Pedreiro", value: "pedreiro" },
  { label: "Jardineiro", value: "jardineiro" },
  { label: "Limpeza", value: "limpeza" },
  { label: "Outro", value: "outro" },
];

interface RouteParams {
  name: string;
  cnpj: string;
  email: string;
  password: string;
}

const RegisterProviderStep2: React.FC = () => {
  const route = useRoute();
  const { name, cnpj, email, password } = route.params as RouteParams;
  const { registerProvider } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [servico, setServico] = useState<string>("");
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false);

  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const formatCep = (value: string): string => {
    const cep = value.replace(/\D/g, "").slice(0, 8);
    if (cep.length <= 5) return cep;
    return `${cep.slice(0, 5)}-${cep.slice(5)}`;
  };

  const handleCepInput = (text: string): void => {
    const formattedCep = formatCep(text);
    setCep(formattedCep);
  };

  useEffect(() => {
    const rawCep = cep.replace(/\D/g, "");

    const clearAddressFields = (): void => {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
    };

    if (rawCep.length === 8) {
      const fetchAddress = async (): Promise<void> => {
        setIsLoadingCep(true);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${rawCep}/json/`
          );
          const data = await response.json();

          if (data.erro) {
            Alert.alert("CEP não encontrado", "Verifique o CEP informado.");
            clearAddressFields();
            return;
          }

          setLogradouro(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setUf(data.uf || "");
        } catch {
          Alert.alert("Erro", "Não foi possível buscar o endereço.");
          clearAddressFields();
        } finally {
          setIsLoadingCep(false);
        }
      };
      fetchAddress();
    } else if (rawCep.length > 0) {
      clearAddressFields();
    }
  }, [cep]);

  const handleSubmit = async (): Promise<void> => {
    if (
      !phone.replace(/\D/g, "") ||
      !cep ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !uf ||
      !servico
    ) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      Alert.alert("Telefone inválido", "Digite um telefone válido.");
      return;
    }

    setIsLoading(true);

    try {
      const providerData = {
        name,
        cnpj,
        email,
        password,
        phone: phone.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        servico,
        userType: "provider" as const,
      };
      await registerProvider(providerData);
      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro no Cadastro",
        "Não foi possível criar a conta. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#57b2c5" />
      <BackButton />

      <Header>
        <HeaderContent>
          <Logo source={require("../../../assets/images/logo.png")} />
          <HeaderTitle>
            Só mais alguns dados para concluir seu cadastro!
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
            <Subtitle>Contato e endereço</Subtitle>

            <InputContainer>
              <Feather name="phone" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(text) => setPhone(formatPhone(text))}
                maxLength={15}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="search" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Digite o CEP"
                keyboardType="number-pad"
                value={cep}
                onChangeText={handleCepInput}
                maxLength={9}
                returnKeyType="next"
                editable={!isLoading && !isLoadingCep}
              />
              {isLoadingCep && (
                <Feather name="loader" size={20} color="#57b2c5" />
              )}
            </InputContainer>

            <InputContainer>
              <Feather name="map-pin" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Logradouro"
                value={logradouro}
                onChangeText={setLogradouro}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="hash" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="info" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Complemento (opcional)"
                value={complemento}
                onChangeText={setComplemento}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="map" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="map" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
                returnKeyType="next"
                editable={!isLoading}
              />
            </InputContainer>

            <InputContainer>
              <Feather name="map" size={20} color="#57b2c5" />
              <StyledInput
                placeholder="Estado (UF)"
                value={uf}
                onChangeText={(text) => setUf(text.toUpperCase())}
                maxLength={2}
                autoCapitalize="characters"
                returnKeyType="done"
                editable={!isLoading}
              />
            </InputContainer>

            <PickerContainer>
              <Feather name="tool" size={20} color="#57b2c5" />
              <StyledPicker
                selectedValue={servico}
                onValueChange={(itemValue) => setServico(itemValue as string)}
                enabled={!isLoading}
              >
                {servicos.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </StyledPicker>
            </PickerContainer>

            <RegisterButton onPress={handleSubmit} disabled={isLoading}>
              <ButtonText>
                {isLoading ? "Processando..." : "Finalizar Cadastro"}
              </ButtonText>
            </RegisterButton>
          </FormContainer>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterProviderStep2;
