import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  Image,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";
import theme from "../../../../theme";

import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  InputGroup,
  InputLabel,
  InputContainer,
  StyledInput,
  StyledCurrencyInput,
  TextArea,
  CategoryPicker,
  CategoryPickerText,
  ValidationText,
  ModalFooter,
  SaveButton,
  SaveButtonText,
  CancelButton,
  CancelButtonText,
  CategoryModal,
  CategoryModalContent,
  CategoryOption,
  CategoryOptionText,
  ImagePickerButton,
  ImagePickerText,
  ImagePreviewContainer,
  ImagePreview,
} from "./../style";

interface AdData {
  id?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
}

interface AdFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (ad: AdData) => void;
  isSaving: boolean;
  initialData?: AdData | null;
  categories: string[];
}

interface ValidationErrors {
  title?: string;
  category?: string;
  price?: string;
  description?: string;
}

const initialAdState: AdData = {
  title: "",
  description: "",
  price: 0,
  category: "",
  image: null,
};

export const AdFormModal: React.FC<AdFormModalProps> = ({
  visible,
  onClose,
  onSave,
  isSaving,
  initialData,
  categories,
}) => {
  const [isPickingImage, setIsPickingImage] = useState(false);
  const [ad, setAd] = useState<AdData>(initialAdState);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const priceInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setAd(initialData || initialAdState);
      setValidationErrors({});
    }
  }, [initialData, visible]);

  const handlePickImage = async () => {
    setIsPickingImage(true);

    try {
      const existingStatus =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus.status !== "granted") {
        const newStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        finalStatus = newStatus;
      }

      if (finalStatus.status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Para selecionar uma imagem, você precisa permitir o acesso à galeria."
        );
        setIsPickingImage(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAd((prev) => ({ ...prev, image: result.assets[0].uri }));
      }
    } catch (error) {
      console.error("Erro ao escolher a imagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao selecionar a imagem.");
    } finally {
      setIsPickingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setAd((prev) => ({ ...prev, image: null }));
  };

  const handleInputChange = (
    field: keyof AdData,
    value: string | number | null
  ) => {
    setAd((prev) => ({ ...prev, [field]: value || "" }));
    if (field in validationErrors) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const selectCategory = (category: string) => {
    handleInputChange("category", category);
    setCategoryModalVisible(false);
    priceInputRef.current?.focus();
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!ad.title.trim() || ad.title.trim().length < 3) {
      errors.title = "Título deve ter pelo menos 3 caracteres";
    }
    if (!ad.category) {
      errors.category = "Categoria é obrigatória";
    }
    if (ad.price <= 0) {
      errors.price = "Preço deve ser maior que zero";
    }
    if (!ad.description.trim() || ad.description.trim().length < 10) {
      errors.description = "Descrição deve ter pelo menos 10 caracteres";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(ad);
    }
  };

  const isEditMode = !!initialData?.id;
  const isLoadingImage = ad.image && isPickingImage;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {isCategoryModalVisible ? (
        <CategoryModal>
          <CategoryModalContent>
            <ModalHeader>
              <ModalTitle>Selecione a Categoria</ModalTitle>
              <CloseButton onPress={() => setCategoryModalVisible(false)}>
                <Feather name="x" size={24} color={theme.COLORS.GRAY_200} />
              </CloseButton>
            </ModalHeader>
            <ScrollView style={{ flex: 1 }}>
              {categories.map((category) => (
                <CategoryOption
                  key={category}
                  onPress={() => selectCategory(category)}
                >
                  <CategoryOptionText>{category}</CategoryOptionText>
                  <Feather
                    name="chevron-right"
                    size={20}
                    color={theme.COLORS.BLUE_400}
                  />
                </CategoryOption>
              ))}
            </ScrollView>
          </CategoryModalContent>
        </CategoryModal>
      ) : (
        <TouchableWithoutFeedback onPress={onClose}>
          <ModalOverlay>
            <TouchableWithoutFeedback>
              <ModalContainer>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>
                      {isEditMode ? "Editar Anúncio" : "Novo Anúncio"}
                    </ModalTitle>
                    <CloseButton onPress={onClose} disabled={isSaving}>
                      <Feather
                        name="x"
                        size={24}
                        color={theme.COLORS.GRAY_200}
                      />
                    </CloseButton>
                  </ModalHeader>

                  <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={Platform.select({
                      ios: 20,
                      android: 100,
                    })}
                    enableOnAndroid={true}
                  >
                    <ModalBody>
                      {/* --- CAMPO IMAGEM --- */}
                      <InputGroup>
                        <InputLabel>Imagem do Serviço</InputLabel>
                        {ad.image ? (
                          <ImagePreviewContainer>
                            <ImagePreview
                              source={{ uri: ad.image }}
                              resizeMode="cover"
                            />
                            <TouchableOpacity
                              onPress={handleRemoveImage}
                              style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                borderRadius: 20,
                                padding: 6,
                              }}
                            >
                              <Feather
                                name="x"
                                size={20}
                                color={theme.COLORS.WHITE}
                              />
                            </TouchableOpacity>
                          </ImagePreviewContainer>
                        ) : (
                          <ImagePickerButton
                            onPress={handlePickImage}
                            disabled={isSaving || isPickingImage}
                            activeOpacity={0.7}
                          >
                            <Feather
                              name="image"
                              size={32}
                              color={theme.COLORS.ORANGE_500}
                            />
                            <ImagePickerText>
                              {isPickingImage
                                ? "Carregando..."
                                : "Toque para selecionar"}
                            </ImagePickerText>
                          </ImagePickerButton>
                        )}
                      </InputGroup>

                      {/* --- CAMPO TÍTULO --- */}
                      <InputGroup>
                        <InputLabel>Título do Serviço *</InputLabel>
                        <InputContainer error={!!validationErrors.title}>
                          <Feather
                            name="type"
                            size={20}
                            color={theme.COLORS.BLUE_400}
                          />
                          <StyledInput
                            placeholder="Ex: Pintura residencial completa"
                            value={ad.title}
                            onChangeText={(text) =>
                              handleInputChange("title", text)
                            }
                            editable={!isSaving}
                            maxLength={100}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                              setCategoryModalVisible(true)
                            }
                            blurOnSubmit={false}
                          />
                        </InputContainer>
                        {validationErrors.title && (
                          <ValidationText>
                            {validationErrors.title}
                          </ValidationText>
                        )}
                      </InputGroup>

                      {/* --- CAMPO CATEGORIA --- */}
                      <InputGroup>
                        <InputLabel>Categoria *</InputLabel>
                        <TouchableOpacity
                          onPress={() => setCategoryModalVisible(true)}
                          disabled={isSaving}
                        >
                          <CategoryPicker error={!!validationErrors.category}>
                            <Feather
                              name="tag"
                              size={20}
                              color={theme.COLORS.BLUE_400}
                            />
                            <CategoryPickerText selected={!!ad.category}>
                              {ad.category || "Selecione uma categoria"}
                            </CategoryPickerText>
                            <Feather
                              name="chevron-down"
                              size={20}
                              color={theme.COLORS.BLUE_400}
                            />
                          </CategoryPicker>
                        </TouchableOpacity>
                        {validationErrors.category && (
                          <ValidationText>
                            {validationErrors.category}
                          </ValidationText>
                        )}
                      </InputGroup>

                      {/* --- CAMPO PREÇO --- */}
                      <InputGroup>
                        <InputLabel>Preço *</InputLabel>
                        <InputContainer error={!!validationErrors.price}>
                          <StyledCurrencyInput
                            value={ad.price}
                            onChangeValue={(value) =>
                              handleInputChange("price", value)
                            }
                            prefix="R$ "
                            delimiter="."
                            separator=","
                            precision={2}
                            placeholder="R$ 0,00"
                            editable={!isSaving}
                            ref={priceInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                              descriptionInputRef.current?.focus()
                            }
                            blurOnSubmit={false}
                          />
                        </InputContainer>
                        {validationErrors.price && (
                          <ValidationText>
                            {validationErrors.price}
                          </ValidationText>
                        )}
                      </InputGroup>

                      {/* --- CAMPO DESCRIÇÃO --- */}
                      <InputGroup>
                        <InputLabel>Descrição do Serviço *</InputLabel>
                        <TextArea
                          placeholder="Descreva detalhadamente o serviço oferecido..."
                          value={ad.description}
                          onChangeText={(text) =>
                            handleInputChange("description", text)
                          }
                          multiline
                          numberOfLines={4}
                          textAlignVertical="top"
                          editable={!isSaving}
                          maxLength={500}
                          error={!!validationErrors.description}
                          ref={descriptionInputRef}
                          returnKeyType="done"
                          onSubmitEditing={handleSave}
                        />
                        <ValidationText
                          style={{
                            textAlign: "right",
                            color: theme.COLORS.GRAY_200,
                            fontSize: 12,
                          }}
                        >
                          {ad.description.length}/500
                        </ValidationText>
                        {validationErrors.description && (
                          <ValidationText>
                            {validationErrors.description}
                          </ValidationText>
                        )}
                      </InputGroup>
                    </ModalBody>
                  </KeyboardAwareScrollView>

                  <ModalFooter>
                    <CancelButton onPress={onClose} disabled={isSaving}>
                      <CancelButtonText>Cancelar</CancelButtonText>
                    </CancelButton>
                    <SaveButton onPress={handleSave} disabled={isSaving}>
                      <SaveButtonText>
                        {isSaving ? "Salvando..." : "Salvar Anúncio"}
                      </SaveButtonText>
                    </SaveButton>
                  </ModalFooter>
                </ModalContent>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </ModalOverlay>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
};
