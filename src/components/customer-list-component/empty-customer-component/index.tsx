import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { EmptyCustomerProps, EmptyCustomerStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyCustomerIcon, PlusIcon } from '../../../assets';

const EmptyCustomerComponent = (props: EmptyCustomerProps) => {
  const { style, onAddCustomer, noCustomerIcon, plusIcon } = props;
  const styles: EmptyCustomerStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {noCustomerIcon ?? <EmptyCustomerIcon />}
      <Text style={styles.titleTextStyle}>
        {i18n?.t('customer_component.lbl_no_customers') ?? 'No Customers'}
      </Text>
      <Text style={styles.messageTextStyle}>
        {i18n?.t('customer_component.msg_no_customers') ??
          'Use the Add customer button to create a customer'}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onAddCustomer}
        style={styles.createButtonContainerStyle}
      >
        {plusIcon ?? <PlusIcon size={20} color={colors.primaryColor} />}
        <Text style={styles.createButtonTextStyle}>
          {i18n?.t('customer_component.btn_create_customer') ?? 'Create new customer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCustomerComponent;
