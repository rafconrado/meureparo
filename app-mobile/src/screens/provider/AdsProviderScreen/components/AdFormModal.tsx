import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
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
} from "./../style";

interface AdData {
  title: string;
  description: string;
  price: number;
  category: string;
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
};

export const AdFormModal: React.FC<AdFormModalProps> = ({
  visible,
  onClose,
  onSave,
  isSaving,
  initialData,
  categories,
}) => {
  const [ad, setAd] = useState<AdData>(initialAdState);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setAd(initialData);
      } else {
        setAd(initialAdState);
      }
      setValidationErrors({});
    }
  }, [initialData, visible]);

  const handleInputChange = (field: keyof AdData, value: string | number | null) => {
    setAd((prev) => ({ ...prev, [field]: value || 0 }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const selectCategory = (category: string) => {
    handleInputChange("category", category);
    setCategoryModalVisible(false);
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

  const isEditMode = !!initialData;

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
                <Feather name="x" size={24} color="#6c757d" />
              </CloseButton>
            </ModalHeader>
            <ScrollView style={{ flex: 1 }}>
              {categories.map((category) => (
                <CategoryOption
                  key={category}
                  onPress={() => selectCategory(category)}
                >
                  <CategoryOptionText>{category}</CategoryOptionText>
                  <Feather name="chevron-right" size={20} color="#57b2c5" />
                </CategoryOption>
              ))}
            </ScrollView>
          </CategoryModalContent>
        </CategoryModal>
      ) : (
        <ModalOverlay>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ModalContainer>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>
                    {isEditMode ? "Editar Anúncio" : "Novo Anúncio"}
                  </ModalTitle>
                  <CloseButton onPress={onClose} disabled={isSaving}>
                    <Feather name="x" size={24} color="#6c757d" />
                  </CloseButton>
                </ModalHeader>
                <ScrollView
                  contentContainerStyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <ModalBody>
                    <InputGroup>
                      <InputLabel>Título do Serviço *</InputLabel>
                      <InputContainer error={!!validationErrors.title}>
                        <Feather name="type" size={20} color="#57b2c5" />
                        <StyledInput
                          placeholder="Ex: Pintura residencial completa"
                          value={ad.title}
                          onChangeText={(text) => handleInputChange("title", text)}
                          editable={!isSaving}
                          maxLength={100}
                        />
                      </InputContainer>
                      {validationErrors.title && (
                        <ValidationText>{validationErrors.title}</ValidationText>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel>Categoria *</InputLabel>
                      <TouchableOpacity
                        onPress={() => setCategoryModalVisible(true)}
                        disabled={isSaving}
                      >
                        <CategoryPicker error={!!validationErrors.category}>
                          <Feather name="tag" size={20} color="#57b2c5" />
                          <CategoryPickerText selected={!!ad.category}>
                            {ad.category || "Selecione uma categoria"}
                          </CategoryPickerText>
                          <Feather name="chevron-down" size={20} color="#57b2c5" />
                        </CategoryPicker>
                      </TouchableOpacity>
                      {validationErrors.category && (
                        <ValidationText>{validationErrors.category}</ValidationText>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel>Preço *</InputLabel>
                      <InputContainer error={!!validationErrors.price}>
                        <StyledCurrencyInput
                          value={ad.price}
                          onChangeValue={(value) => handleInputChange('price', value)}
                          prefix="R$ "
                          delimiter="."
                          separator=","
                          precision={2}
                          placeholder="R$ 0,00"
                          editable={!isSaving}
                        />
                      </InputContainer>
                      {validationErrors.price && (
                        <ValidationText>{validationErrors.price}</ValidationText>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel>Descrição do Serviço *</InputLabel>
                      <TextArea
                        placeholder="Descreva detalhadamente o serviço oferecido..."
                        value={ad.description}
                        onChangeText={(text) => handleInputChange("description", text)}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        editable={!isSaving}
                        maxLength={500}
                        error={!!validationErrors.description}
                      />
                      <ValidationText style={{ textAlign: 'right', color: '#6c757d', fontSize: 12 }}>
                        {ad.description.length}/500
                      </ValidationText>
                      {validationErrors.description && (
                        <ValidationText>{validationErrors.description}</ValidationText>
                      )}
                    </InputGroup>
                  </ModalBody>
                </ScrollView>
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
          </KeyboardAvoidingView>
        </ModalOverlay>
      )}
    </Modal>
  );
};