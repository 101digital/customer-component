import useMergeStyles from './theme';
import React from 'react';
import { View } from 'react-native';
import { CustomerActivityProps, CustomerActivityStyles } from './types';
import InvoiceSummaryComponent from '../invoice-summary-component';
import CustomerInvoicesComponent from '../customer-invoices-component';

const CustomerActivityComponent = (props: CustomerActivityProps) => {
  const {
    style,
    currencyCode,
    EmptyInvoice,
    InvoiceSummary,
    InvoiceItem,
    onInvoiceActions,
    onInvoiceDetails,
    indicatorColor,
    InvoiceShimmer,
  } = props;
  const styles: CustomerActivityStyles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <InvoiceSummaryComponent
        currencyCode={currencyCode}
        style={InvoiceSummary?.style}
        {...InvoiceSummary?.props}
      />
      <CustomerInvoicesComponent
        onInvoiceActions={onInvoiceActions}
        onInvoiceDetails={onInvoiceDetails}
        EmptyInvoice={EmptyInvoice}
        InvoiceItem={InvoiceItem}
        indicatorColor={indicatorColor}
        InvoiceShimmer={InvoiceShimmer}
      />
    </View>
  );
};

export default CustomerActivityComponent;
