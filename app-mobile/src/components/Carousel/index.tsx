import React, { ReactNode } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type Props<T> = {
  title: string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  height?: number;
};

export function CustomCarousel<T>({
  title,
  data,
  renderItem,
  height = 180,
}: Props<T>) {
  return (
    <View style={{ marginBottom: 24 }}>
      {/* Título acima do carrossel */}
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter-Bold",
          marginBottom: 10,
          marginLeft: 8,
          color: "#0C0C0C",
        }}
      >
        {title}
      </Text>

      {/* Carrossel genérico */}
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderItem(item)}
          </View>
        )}
      />
    </View>
  );
}
