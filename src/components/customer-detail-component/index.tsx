import useMergeStyles from './theme';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { CustomerDetailComponentProps, CustomerDetailComponentStyles } from './types';
import HeaderDetailComponent from './header-component';
import CustomerInformationComponent from './customer-information-component';
import { CustomerContext } from '../../context/customer-context';
import CustomerActivityComponent from './customer-activity-component';
import { CustomerService } from '../../services/customer-service';

const CustomerDetailComponent = (props: CustomerDetailComponentProps) => {
  const {
    style,
    customer,
    onEditCustomer,
    onDeletedCustomer,
    onInvoiceActions,
    onInvoiceDetails,
    currencyCode,
    tabIndex,
    EmptyInvoice,
    Header,
    InvoiceSummary,
    InformationDetails,
    InvoiceItem,
    indicatorColor,
    InvoiceShimmer,
  } = props;
  const defaultDueDays = CustomerService.instance().getDefaultDueDate();
  const styles: CustomerDetailComponentStyles = useMergeStyles(style);
  const [activeIndex, setActiveIndex] = useState(tabIndex);
  const {
    getCustomerDetails,
    isDeleteSuccessful,
    clearCustomerDetail,
    getCustomerSummary,
    clearCustomerSummary,
    getCustomerInvoice,
    clearCustomerInvoice,
  } = useContext(CustomerContext);

  useEffect(() => {
    return () => {
      clearCustomerDetail();
      clearCustomerSummary();
      clearCustomerInvoice();
    };
  }, []);

  useEffect(() => {
    if (isDeleteSuccessful) {
      onDeletedCustomer?.();
    }
  }, [isDeleteSuccessful]);

  useEffect(() => {
    getCustomerDetails(customer.id);
    getCustomerSummary(customer.id);
    getCustomerInvoice({ customerId: customer.id });
  }, [customer]);

  return (
    <View style={styles.containerStyle}>
      <HeaderDetailComponent
        actions={['Activity', 'Details']}
        onChangedAction={(index) => {
          setActiveIndex(index);
        }}
        tabIndex={tabIndex}
        style={Header?.style}
        {...Header?.props}
      />
      {activeIndex === 0 && (
        <CustomerActivityComponent
          currencyCode={currencyCode}
          EmptyInvoice={EmptyInvoice}
          InvoiceSummary={InvoiceSummary}
          InvoiceItem={InvoiceItem}
          onInvoiceActions={onInvoiceActions}
          onInvoiceDetails={onInvoiceDetails}
          indicatorColor={indicatorColor}
          InvoiceShimmer={InvoiceShimmer}
        />
      )}
      {activeIndex === 1 && (
        <CustomerInformationComponent
          defaultDueDays={defaultDueDays}
          onEdit={() => onEditCustomer(customer)}
          style={InformationDetails?.style}
        />
      )}
    </View>
  );
};

export default CustomerDetailComponent;
