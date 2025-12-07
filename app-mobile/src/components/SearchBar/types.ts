export interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  placeholderColor?: string;
}
