import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type NoResultSearchProps = {
  noResultIcon?: ReactNode;
  style?: NoResultSearchStyles;
};

export type NoResultSearchStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};
