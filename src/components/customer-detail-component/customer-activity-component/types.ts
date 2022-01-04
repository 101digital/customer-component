import { Invoice } from './../../../types';
import { EmptyInvoiceComponentProps } from '../customer-empty-invoice-component/types';
import { InvoiceSummaryStyles } from '../invoice-summary-component/types';
import { InvoiceItemComponentStyles } from '../invoice-item-component/types';
import { InvoiceShimmerComponentProps } from '../invoice-shimmer-component/types';
import { StyleProp, ViewStyle } from 'react-native';

export type CustomerActivityProps = {
  currencyCode: string;
  onInvoiceDetails: (invoice: Invoice) => void;
  onInvoiceActions: (invoice: Invoice) => void;
  indicatorColor?: string;
  style?: CustomerActivityStyles;
  EmptyInvoice?: EmptyInvoiceComponentProps;
  InvoiceSummary?: {
    props?: {
      paidColor?: string;
      dueColor?: string;
      overdueColor?: string;
      colorOpacity?: number;
    };
    style?: InvoiceSummaryStyles;
  };
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
};

export type CustomerActivityStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
