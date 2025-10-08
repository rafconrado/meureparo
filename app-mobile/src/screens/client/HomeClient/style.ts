import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #0c0c0c;
  font-family: "Inter-Bold";
  margin: 32px 16px 4px 16px;
  line-height: 40px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #6e6e6e;
  font-family: "Inter-Regular";
  margin: 0 16px 24px 16px;
  line-height: 24px;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-family: "Inter-Bold";
  color: #0c0c0c;
  margin-left: 16px;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`;
