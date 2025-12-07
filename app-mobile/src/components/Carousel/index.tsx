import React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { CustomCarouselProps } from "./types";
import { Container, Title, ItemWrapper } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DEFAULT_HEIGHT = 180;
const DEFAULT_ANIMATION_DURATION = 1000;

export function CustomCarousel<T>({
  title,
  data,
  renderItem,
  height = DEFAULT_HEIGHT,
  autoPlay = true,
  loop = true,
  scrollAnimationDuration = DEFAULT_ANIMATION_DURATION,
  style,
}: CustomCarouselProps<T>) {
  return (
    <Container style={style}>
      <Title>{title}</Title>

      <Carousel
        loop={loop}
        width={SCREEN_WIDTH}
        height={height}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={scrollAnimationDuration}
        renderItem={({ item }) => <ItemWrapper>{renderItem(item)}</ItemWrapper>}
      />
    </Container>
  );
}
