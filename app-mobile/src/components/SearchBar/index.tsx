import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SearchContainer, SearchInput, SearchButton } from "./style";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  onSearch,
}) => {
  return (
    <SearchContainer>
      <SearchInput
        placeholder="Buscar serviços ou profissionais..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />
      <SearchButton onPress={onSearch} activeOpacity={0.8}>
        <Ionicons name="search" size={22} color="#FFF" />
      </SearchButton>
    </SearchContainer>
  );
};
