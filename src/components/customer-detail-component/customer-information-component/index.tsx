import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import useMergeStyles from './theme';
import { CustomerInformationProps, CustomerInformationStyles } from './types';
import { AlertModal, Button, ThemeContext } from 'react-native-theme-component';
import { isEmpty } from 'lodash';
import { CustomerAddress } from '../../../types';
import { CustomerContext } from '../../../context/customer-context';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const CustomerInformationComponent = (props: CustomerInformationProps) => {
  const { style, defaultDueDays, onEdit } = props;
  const styles: CustomerInformationStyles = useMergeStyles(style);
  const { customerDetails, isLoadingCustomerDetail, deleteCustomer } = useContext(CustomerContext);
  const { i18n } = useContext(ThemeContext);
  const [isConfirmDelete, setConfirmDelete] = useState(false);

  const toggleConfirmDelete = () => setConfirmDelete(!isConfirmDelete);

  const _getAddress = (address?: CustomerAddress) => {
    if (!address) {
      return '';
    }
    let customer_address = address?.premise ?? '';
    customer_address = (customer_address + ' ' + address?.dependentLocality ?? '').trim();
    customer_address = (customer_address + ' ' + address?.city ?? '').trim();
    customer_address = (customer_address + ' ' + address?.countryCode ?? '').trim();
    customer_address = (customer_address + ' ' + address?.postcode ?? '').trim();
    return customer_address;
  };

  const _renderItem = (label: string, value?: string) => {
    return (
      <>
        <Text style={styles.itemLabelTextStyle}>{label}</Text>
        <View style={styles.itemContainerStyle}>
          <Text style={styles.itemValueTextStyle}>{isEmpty(value) ? 'N/A' : value}</Text>
        </View>
      </>
    );
  };

  if (isLoadingCustomerDetail) {
    return (
      <FlatList
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        data={Array.from({ length: 6 }).map((_, index) => index)}
        renderItem={() => (
          <>
            <ShimmerPlaceHolder shimmerStyle={styles.shimmerLabelStyle} />
            <ShimmerPlaceHolder shimmerStyle={styles.shimmerValueStyle} />
          </>
        )}
      />
    );
  }

  return (
    <>
      <View style={styles.containerStyle}>
        <ScrollView style={styles.contentContainerStyle}>
          {_renderItem(
            i18n?.t('customer_component.lbl_customer_type') ?? 'Customer type',
            customerDetails?.customerType
          )}
          {_renderItem(
            i18n?.t('customer_component.lbl_customer_name') ?? 'Name',
            customerDetails?.name
          )}
          {_renderItem(
            i18n?.t('customer_component.lbl_customer_email') ?? 'Email',
            customerDetails?.contact?.email
          )}
          {_renderItem(
            i18n?.t('customer_component.lbl_customer_phone') ?? 'Phone',
            customerDetails?.contact?.mobileNumber
          )}
          {_renderItem(
            i18n?.t('customer_component.lbl_customer_address') ?? 'Address',
            _getAddress(customerDetails?.addresses[0])
          )}
          {_renderItem(
            i18n?.t('customer_component.lbl_invoice_due_date') ?? 'Invoice due after',
            (customerDetails?.dueDatePeriod ?? -1) >= 0
              ? (i18n?.t('customer_component.lbl_due_days') ?? '%s days').replace(
                  '%s',
                  `${customerDetails?.dueDatePeriod ?? 0}`
                )
              : (i18n?.t('customer_component.lbl_default_due_date') ?? 'Default (%s days)').replace(
                  '%s',
                  defaultDueDays
                )
          )}
          <Text style={styles.itemLabelTextStyle} />
        </ScrollView>
        <View style={styles.footerContainerStyle}>
          <Button
            label={i18n?.t('customer_component.btn_detele') ?? 'Delete'}
            onPress={toggleConfirmDelete}
            variant='secondary'
            style={
              style?.deleteButtonStyle ?? {
                secondaryContainerStyle: {
                  flex: 1,
                  marginRight: 7,
                },
              }
            }
          />
          <Button
            label={i18n?.t('customer_component.btn_edit') ?? 'Edit'}
            onPress={onEdit}
            style={
              style?.editButtonStyle ?? {
                primaryContainerStyle: {
                  flex: 1,
                  marginLeft: 7,
                },
              }
            }
          />
        </View>
      </View>
      <AlertModal
        isVisible={isConfirmDelete}
        title={i18n?.t('customer_component.lbl_delete_customer') ?? 'Delete customer'}
        cancelTitle={i18n?.t('customer_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={i18n?.t('customer_component.btn_detele') ?? 'Delete'}
        onClose={toggleConfirmDelete}
        onCancel={toggleConfirmDelete}
        message={
          i18n?.t('customer_component.msg_delete_customer') ??
          'Are you sure? once deleted, you cannot undo this action.'
        }
        isShowClose={false}
        onConfirmed={() => {
          toggleConfirmDelete();
          deleteCustomer(customerDetails?.id!);
        }}
        style={{
          cancelButtonStyle: {
            secondaryContainerStyle: {
              backgroundColor: 'white',
              flex: 1,
            },
          },
        }}
        timeOut
        timeLimit={500}
      />
    </>
  );
};

export default CustomerInformationComponent;
