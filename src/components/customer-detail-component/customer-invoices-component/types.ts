import { Invoice } from './../../../types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { EmptyInvoiceComponentProps } from '../customer-empty-invoice-component/types';
import { InvoiceItemComponentStyles } from '../invoice-item-component/types';
import { InvoiceShimmerComponentProps } from '../invoice-shimmer-component/types';

export type CustomerInvoiceComponentProps = {
  onInvoiceDetails: (invoice: Invoice) => void;
  onInvoiceActions: (invoice: Invoice) => void;
  indicatorColor?: string;
  sectionDateFormat?: string;
  EmptyInvoice?: EmptyInvoiceComponentProps;
  InvoiceItem?: {
    props?: {
      colorOpacity?: number;
      paidColor?: string;
      dueColor?: string;
      overdueColor?: string;
    };
    style?: InvoiceItemComponentStyles;
  };
  InvoiceShimmer?: InvoiceShimmerComponentProps;
  style?: CustomerInvoiceComponentStyles;
};

export type CustomerInvoiceComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  sectionContainerStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
  loadMoreIndicatorStyle?: StyleProp<ViewStyle>;
};
