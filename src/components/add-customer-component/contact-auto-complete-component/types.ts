import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type ContactAutoCompleteComponentProps = {
  position: number;
  contacts: any[];
  onSelected: (name: any, phoneNumber?: string, email?: string) => void;
  style?: ContactAutoCompleteComponentStyles;
};

export type ContactAutoCompleteComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemContactNameStyle?: StyleProp<TextStyle>;
  itemContactInfoStyle?: StyleProp<TextStyle>;
};
