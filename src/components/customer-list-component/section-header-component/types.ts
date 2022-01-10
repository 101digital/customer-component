import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export type SectionHeaderProps = {
  title: string;
  style?: SectionHeaderStyles;
};

export type SectionHeaderStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};
