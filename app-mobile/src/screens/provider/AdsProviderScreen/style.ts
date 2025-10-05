import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import CurrencyInput from "react-native-currency-input";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Estilos originais mantidos
export const Container = styled.View`
  flex: 1;
  background-color: #57b2c5;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 30px 40px 30px;
  background-color: #57b2c5;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 15px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 1;
  text-align: center;
  line-height: 28px;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  color: #2c2c2c;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
`;

export const AdCard = styled.View`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`;

export const AdTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 5px;
`;

export const AdCategory = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #57b2c5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const AdDescription = styled.Text`
  font-size: 14px;
  color: #6c757d;
  line-height: 20px;
  margin-bottom: 15px;
`;

export const AdPrice = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #57b2c5;
  text-align: right;
  margin-bottom: 15px;
`;

export const AdFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  border-top-width: 1px;
  border-top-color: #e9ecef;
  padding-top: 15px;
`;

export const ActionButton = styled.TouchableOpacity<{
  edit?: boolean;
  delete?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.edit ? "#ffc107" : props.delete ? "#dc3545" : "#57b2c5"};
  padding: 8px 12px;
  border-radius: 8px;
  gap: 5px;
`;

export const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 40px 20px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: #2c2c2c;
  font-weight: 600;
  text-align: center;
`;

export const EmptySubtext = styled.Text`
  font-size: 14px;
  color: #6c757d;
  text-align: center;
  line-height: 20px;
`;

export const FAB = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  bottom: 25px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #57b2c5;
  justify-content: center;
  align-items: center;
  shadow-color: #57b2c5;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 12;
`;

export const FABIcon = styled(Feather)``;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 92%;
  max-width: 480px;
  max-height: 70%;
  flex: 1;
`;

export const ModalContent = styled.View`
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 25px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.15;
  shadow-radius: 15px;
  elevation: 20;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 25px 15px 25px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f3f4;
`;

export const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #2c2c2c;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const ModalBody = styled.View`
  flex: 1;
  padding: 20px 25px;
`;

export const InputGroup = styled.View`
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 8px;
`;

export const InputContainer = styled.View<{ error?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.error ? "#fff5f5" : "#f8f9fa")};
  border: 2px solid ${(props) => (props.error ? "#dc3545" : "#e9ecef")};
  border-radius: 15px;
  padding: 0 15px;
  min-height: 55px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: #2c2c2c;
  padding: 15px 12px;
  font-size: 16px;
  font-weight: 500;
`;

export const StyledCurrencyInput = styled(CurrencyInput).attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: #2c2c2c;
  padding: 15px 12px;
  font-size: 16px;
  font-weight: 500;
`;

export const TextArea = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})<{ error?: boolean }>`
  background-color: ${(props) => (props.error ? "#fff5f5" : "#f8f9fa")};
  border: 2px solid ${(props) => (props.error ? "#dc3545" : "#e9ecef")};
  border-radius: 15px;
  padding: 15px;
  min-height: 120px;
  color: #2c2c2c;
  font-size: 16px;
  font-weight: 500;
`;

export const CategoryPicker = styled.View<{ error?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.error ? "#fff5f5" : "#f8f9fa")};
  border: 2px solid ${(props) => (props.error ? "#dc3545" : "#e9ecef")};
  border-radius: 15px;
  padding: 15px;
  min-height: 55px;
`;

export const CategoryPickerText = styled.Text<{ selected?: boolean }>`
  flex: 1;
  color: ${(props) => (props.selected ? "#2c2c2c" : "#6c757d")};
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
`;

export const ValidationText = styled.Text`
  color: #dc3545;
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
  margin-left: 5px;
`;

export const ModalFooter = styled.View`
  flex-direction: row;
  padding: 20px 25px 30px 25px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: #f1f3f4;
`;

export const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 2;
  background-color: #57b2c5;
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  shadow-color: #57b2c5;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 6;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const SaveButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const CancelButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 1;
  background-color: transparent;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const CancelButtonText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  font-weight: 600;
`;

// Modal de Categoria melhorado
export const CategoryModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
`;

export const CategoryModalContent = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-radius: 25px;
  max-width: 400px;
  width: 90%;
  align-self: center;
  shadow-color: #000;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 15;
  max-height: 80%;
`;

export const CategoryOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 25px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f3f4;
`;

export const CategoryOptionText = styled.Text`
  font-size: 16px;
  color: #2c2c2c;
  font-weight: 500;
`;
