import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ErrorLoadCustomerComponentProps, ErrorLoadCustomerComponentStyles } from '../types';
import { DangerIcon } from '../../../assets';
import { CustomerContext } from '../../../context/customer-context';
import { ThemeContext } from 'react-native-theme-component';

const ErrorLoadCustomerComponent = (props: ErrorLoadCustomerComponentProps) => {
  const { style, errorIcon } = props;
  const styles: ErrorLoadCustomerComponentStyles = useMergeStyles(style);
  const { errorLoadCustomer, clearErrors, getCustomers } = useContext(CustomerContext);
  const errorId = (errorLoadCustomer as any)?.response?.data?.errors?.[0]?.code;
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {errorIcon ?? <DangerIcon size={74} />}
      <Text style={styles.errorTitleStyle}>
        {i18n?.t('customer_component.msg_error_load_customer') ?? 'Error loading customers'}
      </Text>
      {errorId && <Text style={styles.errorMessageStyle}>{`(Error: ${errorId})`}</Text>}
      <TouchableOpacity
        style={styles.retryButtonContainerStyle}
        onPress={() => {
          clearErrors();
          getCustomers();
        }}
      >
        <Text style={styles.retryTextStyle}>
          {i18n?.t('customer_component.btn_retry') ?? 'Try again'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorLoadCustomerComponent;
