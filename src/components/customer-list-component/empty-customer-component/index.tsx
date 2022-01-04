import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EmptyCustomerProps, EmptyCustomerStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyCustomerIcon, PlusIcon } from '../../../assets';
import { CustomerContext } from '../../../context/customer-context';

const EmptyCustomerComponent = (props: EmptyCustomerProps) => {
  const { style, onAddCustomer, noCustomerIcon, plusIcon, indicatorColor } = props;
  const styles: EmptyCustomerStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const { isRefreshingCustomers, refreshCustomers } = useContext(CustomerContext);

  return (
    <ScrollView
      contentContainerStyle={styles.containerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshingCustomers}
          onRefresh={() => {
            refreshCustomers();
          }}
          tintColor={indicatorColor ?? colors.primaryColor}
        />
      }
    >
      <View style={styles.contentContainerStyle}>
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
    </ScrollView>
  );
};

export default EmptyCustomerComponent;
