import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type EmptyCustomerProps = {
  noCustomerIcon?: ReactNode;
  plusIcon?: ReactNode;
  onAddCustomer?: () => void;
  style?: EmptyCustomerStyles;
};

export type EmptyCustomerStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  createButtonContainerStyle?: StyleProp<ViewStyle>;
  createButtonTextStyle?: StyleProp<TextStyle>;
};
