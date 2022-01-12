import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type EmptyInvoiceComponentProps = {
  emptyIcon?: ReactNode;
  indicatorColor?: string;
  style?: EmptyInvoiceComponentStyles;
};

export type EmptyInvoiceComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
};
