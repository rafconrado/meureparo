import React, { useState } from "react";
import { StatusBar, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { useAuth } from "../../contexts/AuthContext";
import { BackButton } from "../../components/BackButton";

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
  PickerContainer,
  StyledPicker,
} from "./style";

import {
  RegisterClientStep2NavigationProp,
  RegisterClientStep2RouteProp,
} from "../../@types/navigation";

interface RouteParams {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const motivos = [
  { label: "Como nos conheceu?", value: "" },
  { label: "Indicação de um amigo ou familiar", value: "indicacao" },
  { label: "Pesquisa no Google", value: "google" },
  { label: "Redes Sociais (Instagram, Facebook...)", value: "redes_sociais" },
  { label: "Anúncio na internet", value: "anuncio_online" },
  { label: "Rádio ou TV", value: "radio_tv" },
  { label: "Outro", value: "outro" },
];

const RegisterClientStep2 = () => {
  const navigation = useNavigation<RegisterClientStep2NavigationProp>();
  const route = useRoute<RegisterClientStep2RouteProp>();
  const { name, cpf, email, password } = route.params as RouteParams;

  const { register } = useAuth();

  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [comoFicouSabendo, setComoFicouSabendo] = useState("");

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
    const cep = value.replace(/\D/g, "");
    if (cep.length <= 5) return cep;
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  };

  const handleCepChange = async (text: string) => {
    const rawCep = text.replace(/\D/g, "");
    const formattedCep = formatCep(rawCep);
    setCep(formattedCep);

    if (rawCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${rawCep}/json/`
        );
        const data = await response.json();
        if (data.erro) {
          Alert.alert("CEP não encontrado", "Verifique o CEP informado.");
          setLogradouro("");
          setBairro("");
          setCidade("");
          setUf("");
          return;
        }
        setLogradouro(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setUf(data.uf || "");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar o endereço.");
      }
    } else {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
    }
  };

  const handleFinishRegister = async () => {
    if (
      !phone.replace(/\D/g, "") ||
      !cep ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !uf ||
      !comoFicouSabendo
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    try {
      await register({
        name,
        cpf,
        email,
        password,
        phone,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        comoFicouSabendo,
        userType: "client",
      });

      Alert.alert("Sucesso!", "Cadastro finalizado com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("HomeClient" as never),
        },
      ]);
    } catch (error: any) {
      console.error("Erro ao finalizar cadastro:", error);
      Alert.alert(
        "Erro no Cadastro",
        error.message || "Não foi possível concluir o cadastro."
      );
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#df692b" />
        <BackButton />

        <Header>
          <HeaderContent>
            <Logo source={require("../../assets/images/logo.png")} />
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
              onChangeText={handleCepChange}
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
            />
          </InputContainer>

          <PickerContainer>
            <Feather name="help-circle" size={20} color="white" />
            <StyledPicker
              selectedValue={comoFicouSabendo}
              onValueChange={(itemValue) =>
                setComoFicouSabendo(itemValue as string)
              }
              dropdownIconColor={"#FFF"}
            >
              {motivos.map((motivo) => (
                <Picker.Item
                  key={motivo.value}
                  label={motivo.label}
                  value={motivo.value}
                />
              ))}
            </StyledPicker>
          </PickerContainer>

          <RegisterButton onPress={handleFinishRegister}>
            <ButtonText>Finalizar Cadastro</ButtonText>
          </RegisterButton>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default RegisterClientStep2;
