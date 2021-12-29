import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';
import { CustomerReference, Invoice } from '../../types';

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

export type HeaderDetailProps = {
  actions: string[];
  tabIndex: number;
  onChangedAction: (index: number) => void;
  activeBackgroundColor?: string;
  inActiveBackgrounColor?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  style?: HeaderDetailStyles;
};

export type HeaderDetailStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<TextStyle>;
};

export type CustomerInformationProps = {
  defaultDueDays: number;
  onEdit: () => void;
  style?: CustomerInformationStyles;
};

export type CustomerInformationStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  itemLabelTextStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemValueTextStyle?: StyleProp<TextStyle>;
  deleteButtonStyle?: ButtonStyles;
  editButtonStyle?: ButtonStyles;
  shimmerLabelStyle?: StyleProp<ViewStyle>;
  shimmerValueStyle?: StyleProp<ViewStyle>;
};

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

export type EmptyInvoiceComponentProps = {
  emptyIcon?: ReactNode;
  indicatorColor?: string;
  style?: EmptyInvoiceComponentStyles;
};

export type EmptyInvoiceComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
};

export type CustomerInvoiceComponentProps = {
  onInvoiceDetails: (invoice: Invoice) => void;
  onInvoiceActions: (invoice: Invoice) => void;
  indicatorColor?: string;
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

export type InvoiceItemComponentProps = {
  invoice: Invoice;
  colorOpacity?: number;
  paidColor?: string;
  dueColor?: string;
  overdueColor?: string;
  onPressed: (invoice: Invoice) => void;
  onMoreAction: (invoice: Invoice) => void;
  style?: InvoiceItemComponentStyles;
};

export type InvoiceItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  invoiceNumberStyle?: StyleProp<TextStyle>;
  invoiceNumberContainerStyle?: StyleProp<ViewStyle>;
  invoiceDescriptionStyle?: StyleProp<TextStyle>;
  invoiceDateStyle?: StyleProp<TextStyle>;
  invoiceAmountContainerStyle?: StyleProp<ViewStyle>;
  invoiceAmountStyle?: StyleProp<TextStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  statusContainerStyle?: StyleProp<ViewStyle>;
  statusBoxStyle?: StyleProp<ViewStyle>;
  statusTextStyle?: StyleProp<TextStyle>;
  subStatusTextStyle?: StyleProp<TextStyle>;
};

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
