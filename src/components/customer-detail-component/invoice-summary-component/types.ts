import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type InvoiceSummaryProps = {
  paidColor?: string;
  dueColor?: string;
  overdueColor?: string;
  colorOpacity?: number;
  currencyCode: string;
  style?: InvoiceSummaryStyles;
};

export type InvoiceSummaryStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemLabelStyle?: StyleProp<TextStyle>;
  itemValueStyle?: StyleProp<TextStyle>;
  itemHeaderShimmerStyle?: StyleProp<ViewStyle>;
  itemCountShimmerStyle?: StyleProp<ViewStyle>;
  itemValueShimmerStyle?: StyleProp<ViewStyle>;
  itemLabelShimmerStyle?: StyleProp<ViewStyle>;
};
