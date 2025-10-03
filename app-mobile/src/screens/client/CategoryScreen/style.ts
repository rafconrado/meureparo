import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 24px 16px 16px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const EmptyListText = styled.Text`
  font-size: 16px;
  color: #666;
`;