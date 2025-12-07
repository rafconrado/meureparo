import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const Header = styled.View`
  background-color: #57b2c5;
  padding: 50px 20px 20px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
  shadow-radius: 8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const SearchContainer = styled.View`
  background-color: #fff;
  margin: -25px 20px 20px 20px;
  padding: 0 15px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  height: 50px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;

export const SearchIcon = styled.View`
  margin-right: 10px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

export const ChatList = styled.FlatList`
  flex: 1;
`;

export const ChatItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const AvatarContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #e9ecef;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AvatarFallback = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa;
`;

export const ChatContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ClientName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const MetaContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-left: 10px;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
`;

export const UnreadBadge = styled.View`
  background-color: #57b2c5;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
`;

export const UnreadText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #999;
  margin-top: 10px;
`;
