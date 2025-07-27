import React, { useState } from "react";
import { StatusBar, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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

import { BackButton } from "../../components/BackButton";

interface RouteParams {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const motivos = [
  { label: "Selecione uma opção...", value: "" },
  { label: "Indicação de um amigo ou familiar", value: "indicacao" },
  { label: "Pesquisa no Google", value: "google" },
  { label: "Redes Sociais (Instagram, Facebook...)", value: "redes_sociais" },
  { label: "Anúncio na internet", value: "anuncio_online" },
  { label: "Rádio ou TV", value: "radio_tv" },
  { label: "Outro", value: "outro" },
];

const RegisterClientStep2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, cpf, email, password } = route.params as RouteParams;

  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [comoFicouSabendo, setComoFicouSabendo] = useState("");

  const handleCepChange = async (text: string) => {
    const formattedCep = text.replace(/\D/g, "");
    setCep(formattedCep);

    if (formattedCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formattedCep}/json/`
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

  const handleFinishRegister = () => {
    if (
      !phone ||
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

    const enderecoCompleto = `${logradouro}, ${numero}${
      complemento ? `, ${complemento}` : ""
    } - ${bairro}, ${cidade} - ${uf}`;

    console.log("Dados finais:", {
      name,
      cpf,
      email,
      password,
      phone,
      cep,
      enderecoCompleto,
      comoFicouSabendo,
    });

    Alert.alert("Sucesso!", "Cadastro finalizado com sucesso.");
    navigation.goBack();
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
              onChangeText={setPhone}
            />
          </InputContainer>

          <InputContainer>
            <Feather name="search" size={20} color="white" />
            <StyledInput
              placeholder="CEP"
              keyboardType="number-pad"
              value={cep}
              onChangeText={handleCepChange}
              maxLength={8}
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
