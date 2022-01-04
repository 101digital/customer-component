import { StyleProp, ViewStyle } from 'react-native';

export type InvoiceShimmerComponentProps = {
  style?: InvoiceShimmerComponentStyles;
};

export type InvoiceShimmerComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  invoiceNumberStyle?: StyleProp<ViewStyle>;
  invoiceDescriptionStyle?: StyleProp<ViewStyle>;
  invoiceDateStyle?: StyleProp<ViewStyle>;
  invoiceAmountStyle?: StyleProp<ViewStyle>;
  invoiceStatusStyle?: StyleProp<ViewStyle>;
};
