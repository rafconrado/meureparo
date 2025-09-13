import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Logo } from "./style";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Selection" as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <Logo
        source={require("../../../assets/images/logo.png")}
        resizeMode="contain"
      />
    </Container>
  );
};

export default SplashScreen;
