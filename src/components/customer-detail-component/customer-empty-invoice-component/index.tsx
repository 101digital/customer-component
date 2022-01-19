import { EmptyInvoiceIcon } from '../../../assets';
import React, { useContext } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { EmptyInvoiceComponentProps, EmptyInvoiceComponentStyles } from './types';
import useMergeStyles from './theme';
import { ThemeContext } from 'react-native-theme-component';
import { CustomerContext } from '../../../context/customer-context';

const CustomerEmptyInvoiceComponent = (props: EmptyInvoiceComponentProps) => {
  const { style, indicatorColor, emptyIcon } = props;
  const styles: EmptyInvoiceComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const { refreshCustomerInvoice, allInvoices, customerDetails } = useContext(CustomerContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={allInvoices.isRefreshing}
          onRefresh={() => refreshCustomerInvoice({ customerId: customerDetails?.id })}
          tintColor={indicatorColor ?? colors.primaryColor}
        />
      }
      contentContainerStyle={styles.containerStyle}
    >
      {emptyIcon ?? <EmptyInvoiceIcon size={96} />}

      <Text style={styles.messageStyle}>
        {i18n?.t('customer_component.lbl_no_customer_invoice_found') ??
          `This customer doesn’t have any invoice`}
      </Text>
    </ScrollView>
  );
};

export default CustomerEmptyInvoiceComponent;
