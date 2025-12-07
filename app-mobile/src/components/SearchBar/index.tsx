import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { SearchBarProps } from "./types";
import { SearchContainer, SearchInput, SearchButton } from "./styles";

const DEFAULT_PLACEHOLDER = "Buscar serviços ou profissionais...";
const DEFAULT_PLACEHOLDER_COLOR = "#999";

export const SearchBar = ({
  searchText,
  setSearchText,
  onSearch,
  placeholder = DEFAULT_PLACEHOLDER,
  placeholderColor = DEFAULT_PLACEHOLDER_COLOR,
}: SearchBarProps) => {
  return (
    <SearchContainer>
      <SearchInput
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor={placeholderColor}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <SearchButton onPress={onSearch} activeOpacity={0.8}>
        <Ionicons name="search" size={22} color="#FFF" />
      </SearchButton>
    </SearchContainer>
  );
};
