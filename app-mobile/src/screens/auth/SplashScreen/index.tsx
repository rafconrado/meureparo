import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Logo } from "./style";

import { SplashScreenNavigationProp } from "./types";

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "SelectionScreen" }],
      });
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
