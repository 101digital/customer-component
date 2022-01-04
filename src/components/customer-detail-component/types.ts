import { StyleProp, ViewStyle } from 'react-native';
import { CustomerReference, Invoice } from '../../types';
import { EmptyInvoiceComponentProps } from './customer-empty-invoice-component/types';
import { CustomerInformationStyles } from './customer-information-component/types';
import { HeaderDetailStyles } from './header-component/types';
import { InvoiceItemComponentStyles } from './invoice-item-component/types';
import { InvoiceShimmerComponentProps } from './invoice-shimmer-component/types';
import { InvoiceSummaryStyles } from './invoice-summary-component/types';

export type CustomerDetailComponentProps = {
  customer: CustomerReference;
  defaultDueDays: number;
  tabIndex: number;
  onEditCustomer: (customer: CustomerReference) => void;
  onDeletedCustomer?: () => void;
  onInvoiceDetails: (invoice: Invoice) => void;
  onInvoiceActions: (invoice: Invoice) => void;
  indicatorColor?: string;
  style?: CustomerDetailComponentStyles;
  currencyCode: string;
  Header?: {
    props?: {
      actions?: string[];
      activeBackgroundColor?: string;
      inActiveBackgrounColor?: string;
      activeTextColor?: string;
      inActiveTextColor?: string;
    };
    style?: HeaderDetailStyles;
  };
  InvoiceSummary?: {
    props?: {
      paidColor?: string;
      dueColor?: string;
      overdueColor?: string;
      colorOpacity?: number;
    };
    style?: InvoiceSummaryStyles;
  };
  EmptyInvoice?: EmptyInvoiceComponentProps;
  InformationDetails?: {
    style?: CustomerInformationStyles;
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

export type CustomerDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
