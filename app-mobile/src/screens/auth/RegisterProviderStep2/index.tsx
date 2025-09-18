import React, { useState, useEffect } from "react";
import { StatusBar, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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
  { label: "Qual serviço você oferece?", value: "" },
  { label: "Pintor", value: "pintor" },
  { label: "Encanador", value: "encanador" },
  { label: "Eletricista", value: "eletricista" },
  { label: "Montador de móveis", value: "montador" },
  { label: "Outro", value: "outro" },
];

const RegisterProviderStep2 = () => {
  const route = useRoute();
  const { name, cnpj, email, password } = route.params as {
    name: string;
    cnpj: string;
    email: string;
    password: string;
  };

  const { registerProvider } = useAuth();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [servico, setServico] = useState("");

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  };

  const formatCep = (value: string) => {
    const cep = value.replace(/\D/g, "").slice(0, 8);
    if (cep.length <= 5) return cep;
    return `${cep.slice(0, 5)}-${cep.slice(5)}`;
  };

  const handleCepInput = (text: string) => {
    const formattedCep = formatCep(text);
    setCep(formattedCep);
  };

  useEffect(() => {
    const rawCep = cep.replace(/\D/g, "");

    const clearAddressFields = () => {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
    };

    if (rawCep.length === 8) {
      const fetchAddress = async () => {
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
        }
      };
      fetchAddress();
    } else if (rawCep.length > 0) {
      clearAddressFields();
    }
  }, [cep]);

  const handleSubmit = async () => {
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
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    setLoading(true);

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
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro no Cadastro",
        "Não foi possível criar a conta. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="light-content" backgroundColor="#57B2C5" />
        <BackButton />

        <Header>
          <HeaderContent>
            <Logo source={require("../../../assets/images/logo.png")} />
            <HeaderTitle>
              Só mais alguns dados para concluir seu cadastro...
            </HeaderTitle>
          </HeaderContent>
        </Header>

        <FormContainer>
          <Subtitle>Informações adicionais:</Subtitle>

          <InputContainer>
            <Feather name="phone" size={20} color="white" />
            <StyledInput
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => setPhone(formatPhone(text))}
              maxLength={15}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="search" size={20} color="white" />
            <StyledInput
              placeholder="CEP"
              keyboardType="number-pad"
              value={cep}
              onChangeText={handleCepInput}
              maxLength={9}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="map-pin" size={20} color="white" />
            <StyledInput
              placeholder="Logradouro"
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="hash" size={20} color="white" />
            <StyledInput
              placeholder="Número"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
          </InputContainer>

          <InputContainer>
            <Feather name="info" size={20} color="white" />
            <StyledInput
              placeholder="Complemento (opcional)"
              value={complemento}
              onChangeText={setComplemento}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="map" size={20} color="white" />
            <StyledInput
              placeholder="Bairro"
              value={bairro}
              onChangeText={setBairro}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="map" size={20} color="white" />
            <StyledInput
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="map" size={20} color="white" />
            <StyledInput
              placeholder="UF"
              value={uf}
              onChangeText={setUf}
              maxLength={2}
              autoCapitalize="characters"
            />
          </InputContainer>

          <PickerContainer>
            <Feather name="tool" size={20} color="white" />
            <StyledPicker
              selectedValue={servico}
              onValueChange={(itemValue) => setServico(itemValue as string)}
              dropdownIconColor={"#FFF"}
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

          <RegisterButton onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <ButtonText>Finalizar Cadastro</ButtonText>
            )}
          </RegisterButton>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default RegisterProviderStep2;
