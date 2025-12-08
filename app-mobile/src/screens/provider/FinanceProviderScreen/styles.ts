import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const Header = styled.View`
  background-color: #57b2c5;
  padding: 50px 20px 80px 20px; /* Padding bottom extra para o card flutuar */
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const BalanceCard = styled.View`
  background-color: #fff;
  margin: -60px 20px 20px 20px; /* Margem negativa para subir */
  padding: 20px;
  border-radius: 16px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
  shadow-radius: 8px;
`;

export const BalanceLabel = styled.Text`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const BalanceValue = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #0c0c0c;
  margin: 10px 0 20px 0;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #57b2c5;
  padding: 12px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 20px 15px 20px;
`;

export const TransactionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;

// O ícone tem fundo verde claro se for entrada, vermelho claro se saída
export const IconBox = styled.View<{ type: "income" | "outcome" }>`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${(props) =>
    props.type === "income" ? "#e6f9e9" : "#ffebee"};
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const TransactionInfo = styled.View`
  flex: 1;
`;

export const TransactionTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

export const TransactionDate = styled.Text`
  font-size: 12px;
  color: #999;
`;

export const TransactionAmount = styled.Text<{ type: "income" | "outcome" }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.type === "income" ? "#28a745" : "#dc3545")};
`;

export const EmptyContainer = styled.View`
  align-items: center;
  margin-top: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;
