import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type ErrorLoadCustomerComponentProps = {
  errorIcon?: ReactNode;
  style?: ErrorLoadCustomerComponentStyles;
};

export type ErrorLoadCustomerComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  errorTitleStyle?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  retryButtonContainerStyle?: StyleProp<ViewStyle>;
  retryTextStyle?: StyleProp<TextStyle>;
};
