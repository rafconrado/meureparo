import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import CurrencyInput from "react-native-currency-input";
import theme from "../../../theme";

const { width: screenWidth } = Dimensions.get("window");

// ============================================
// CONTAINER PRINCIPAL
// ============================================
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.BLUE_400};
`;

// ============================================
// HEADER
// ============================================
export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 30px 40px 30px;
  background-color: ${theme.COLORS.BLUE_400};
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
  color: ${theme.COLORS.WHITE};
  font-weight: 700;
  font-family: ${theme.FONT_FAMILY.EXTRA_BOLD};
  flex-shrink: 1;
  text-align: center;
`;

// ============================================
// CONTENT CONTAINER
// ============================================
export const ContentContainer = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
  padding: 20px;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.BLACK};
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
`;

// ============================================
// AD CARD
// ============================================
export const AdCard = styled.View.attrs({
  style: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
})`
  background-color: ${theme.COLORS.WHITE};
  border: 1px solid ${theme.COLORS.GRAY_200};
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
`;

export const AdImage = styled.Image`
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
`;

export const AdContent = styled.View`
  padding: 16px;
`;

export const AdTitle = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.BLACK};
  margin-bottom: 5px;
`;

export const AdCategory = styled.Text`
  font-size: ${theme.FONT_SIZE.XS}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.BLUE_400};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const AdDescription = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  color: #6c757d;
  line-height: 20px;
  margin-bottom: 15px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const AdPrice = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.ORANGE_500};
  text-align: right;
  margin-bottom: 15px;
`;

export const AdFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  border-top-width: 1px;
  border-top-color: ${theme.COLORS.GRAY_200};
  padding-top: 15px;
`;

export const ActionButton = styled.TouchableOpacity<{
  edit?: boolean;
  delete?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => {
    if (props.edit) return theme.COLORS.ORANGE_500;
    if (props.delete) return "#dc3545";
    return theme.COLORS.BLUE_400;
  }};
  padding: 8px 12px;
  border-radius: 8px;
  gap: 5px;
`;

export const ActionButtonText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.XS}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

// ============================================
// LOADING & EMPTY STATES
// ============================================
export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${theme.COLORS.WHITE};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 40px 20px;
`;

export const EmptyText = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.BLACK};
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const EmptySubtext = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  color: #6c757d;
  text-align: center;
  line-height: 20px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

// ============================================
// FAB (FLOATING ACTION BUTTON)
// ============================================
export const FAB = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  bottom: 25px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.COLORS.BLUE_400};
  justify-content: center;
  align-items: center;
  shadow-color: ${theme.COLORS.BLUE_400};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 12;
`;

export const FABIcon = styled(Feather)``;

// ============================================
// MODAL OVERLAY & CONTAINER
// ============================================
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 92%;
  max-width: 480px;
  max-height: 85%;
  flex: 1;
`;

export const ModalContent = styled.View`
  flex-grow: 1;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 25px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.15;
  shadow-radius: 15px;
  elevation: 20;
`;

// ============================================
// MODAL HEADER
// ============================================
export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 25px 15px 25px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f3f4;
`;

export const ModalTitle = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.BLACK};
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

// ============================================
// MODAL BODY
// ============================================
export const ModalBody = styled.View`
  flex: 1;
  padding: 20px 25px;
`;

export const InputGroup = styled.View`
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.BLACK};
  margin-bottom: 8px;
`;

export const InputContainer = styled.View<{ error?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.error ? "rgba(220, 53, 69, 0.05)" : theme.COLORS.WHITE};
  border: 2px solid
    ${(props) => (props.error ? "#dc3545" : theme.COLORS.GRAY_200)};
  border-radius: 15px;
  padding: 0 15px;
  min-height: 55px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: ${theme.COLORS.BLACK};
  padding: 15px 12px;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const StyledCurrencyInput = styled(CurrencyInput).attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: ${theme.COLORS.BLACK};
  padding: 15px 12px;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const TextArea = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})<{ error?: boolean }>`
  background-color: ${(props) =>
    props.error ? "rgba(220, 53, 69, 0.05)" : theme.COLORS.WHITE};
  border: 2px solid
    ${(props) => (props.error ? "#dc3545" : theme.COLORS.GRAY_200)};
  border-radius: 15px;
  padding: 15px;
  min-height: 120px;
  color: ${theme.COLORS.BLACK};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const ValidationText = styled.Text`
  color: #dc3545;
  font-size: ${theme.FONT_SIZE.SM}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  margin-top: 5px;
  margin-left: 5px;
`;

// ============================================
// CATEGORY PICKER
// ============================================
export const CategoryPicker = styled.View<{ error?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.error ? "rgba(220, 53, 69, 0.05)" : theme.COLORS.WHITE};
  border: 2px solid
    ${(props) => (props.error ? "#dc3545" : theme.COLORS.GRAY_200)};
  border-radius: 15px;
  padding: 15px;
  min-height: 55px;
`;

export const CategoryPickerText = styled.Text<{ selected?: boolean }>`
  flex: 1;
  color: ${(props) => (props.selected ? theme.COLORS.BLACK : "#6c757d")};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  margin-left: 12px;
`;

// ============================================
// MODAL FOOTER
// ============================================
export const ModalFooter = styled.View`
  flex-direction: row;
  padding: 20px 25px 30px 25px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: #f1f3f4;
`;

export const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 2;
  background-color: ${theme.COLORS.BLUE_400};
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  shadow-color: ${theme.COLORS.BLUE_400};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 6;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const SaveButtonText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  letter-spacing: 0.5px;
`;

export const CancelButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 1;
  background-color: transparent;
  border: 2px solid ${theme.COLORS.GRAY_200};
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const CancelButtonText = styled.Text`
  color: #6c757d;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_FAMILY.BOLD};
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

// ============================================
// CATEGORY MODAL
// ============================================
export const CategoryModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
`;

export const CategoryModalContent = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
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
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.BLACK};
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

// ============================================
// IMAGE PICKER
// ============================================
export const ImagePickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
  border: 2px dashed ${theme.COLORS.GRAY_200};
  border-radius: 15px;
  height: 150px;
  margin-bottom: 10px;
`;

export const ImagePickerText = styled.Text`
  color: #6c757d;
  font-size: ${theme.FONT_SIZE.SM}px;
  font-weight: ${theme.FONT_FAMILY.REGULAR};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  margin-left: 10px;
`;

export const ImagePreviewContainer = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  border: 1px solid ${theme.COLORS.GRAY_200};
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
`;
