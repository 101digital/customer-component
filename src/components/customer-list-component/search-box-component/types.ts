import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type SearchBoxProps = {
  onSearch: (key: string) => void;
  searchIcon?: ReactNode;
  placeholderColor?: string;
  style?: SearchBoxStyles;
};

export type SearchBoxStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  searchIconContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputTextStyle?: StyleProp<TextStyle>;
};
