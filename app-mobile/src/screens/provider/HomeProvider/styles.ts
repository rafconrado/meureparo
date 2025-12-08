import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const Header = styled.View`
  background-color: #57b2c5;
  padding: 20px 20px 60px 20px; /* Padding bottom maior para caber o card */
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
  color: #e0f7fa;
  font-size: 14px;
`;

export const UserName = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
`;

export const StatusText = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
  font-weight: 600;
`;

export const DashboardCard = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px 0;
  margin-top: 10px;

  /* Sombra para efeito flutuante */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;

  /* Posicionamento absoluto ou margem negativa pode ser usado, 
     mas aqui usaremos o fluxo normal com margem no container pai */
  position: absolute;
  bottom: -40px;
  left: 20px;
  right: 20px;
`;

export const StatItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #0c0c0c;
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 60px 20px 15px 20px; /* Margem top grande por causa do card flutuante */
`;

export const RequestCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;

export const RequestHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ClientInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ClientName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 8px;
`;

export const ServiceBadge = styled.View`
  background-color: #e0f7fa;
  padding: 4px 8px;
  border-radius: 8px;
`;

export const ServiceText = styled.Text`
  color: #0097a7;
  font-size: 12px;
  font-weight: bold;
`;

export const RequestDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const DetailItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DetailText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-left: 5px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const AcceptButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #57b2c5;
  padding: 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RejectButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #fff;
  border: 1px solid #dc3545;
  padding: 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const EmptyText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 10px;
`;
