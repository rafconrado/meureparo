import React, { useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../../contexts/AuthContext";
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

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
      return;
    }

    setIsLoading(true);

    try {
      await signIn({ email, password }, "provider");
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro no Login", error.message);
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
          <Logo source={require("../../../assets/images/provider.png")} />
          <HeaderTitle>Conectando você a novas oportunidades.</HeaderTitle>
        </HeaderContent>
      </Header>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        enableOnAndroid
        extraScrollHeight={20}
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
            <ButtonText>{isLoading ? "Entrando..." : "Entrar"}</ButtonText>
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
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LoginProviderScreen;