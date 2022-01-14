import useMergeStyles from './theme';
import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomerItemProps, CustomerItemStyles } from './types';
import { AlertModal, BottomSheet, ThemeContext } from 'react-native-theme-component';
import { DeleteIcon, EditIcon, MoreIcon } from '../../../assets';

const CustomerItemComponent = (props: CustomerItemProps) => {
  const {
    customer,
    onPressed,
    style,
    moreIcon,
    editIcon,
    deleteIcon,
    onDeleted,
    onEdit,
    editable,
  } = props;
  const styles: CustomerItemStyles = useMergeStyles(style);
  const [isShowMore, setShowMore] = useState(false);
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const { i18n } = useContext(ThemeContext);

  const toggleMore = () => setShowMore(!isShowMore);
  const toggleConfirmDelete = () => setConfirmDelete(!isConfirmDelete);

  return (
    <>
      <TouchableOpacity style={styles.containerStyle} activeOpacity={0.8} onPress={onPressed}>
        <View style={[styles.avatarContainerStyle, { backgroundColor: customer.colorCode }]}>
          <Text style={styles.avatarTextStyle}>{customer.avator}</Text>
        </View>
        <Text style={styles.customerNameStyle}>{customer.customerName}</Text>
        {editable && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.moreContainerStyle}
            onPress={toggleMore}
          >
            {moreIcon ?? <MoreIcon color='#000' />}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <BottomSheet
        isVisible={isShowMore}
        onBackButtonPress={toggleMore}
        onBackdropPress={toggleMore}
      >
        <View style={styles.actionsContainerStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButtonStyle}
            onPress={() => {
              toggleMore();
              onEdit();
            }}
          >
            {editIcon ?? <EditIcon />}
            <Text style={styles.actionTitleStyle}>
              {i18n?.t('customer_component.btn_edit_customer') ?? 'Edit customer'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButtonStyle}
            onPress={() => {
              toggleMore();
              toggleConfirmDelete();
            }}
          >
            {deleteIcon ?? <DeleteIcon />}
            <Text style={styles.actionTitleStyle}>
              {i18n?.t('customer_component.btn_delete_customer') ?? 'Delete customer'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelButtonStyle}
            onPress={toggleMore}
          >
            <Text style={styles.cancelTextStyle}>
              {i18n?.t('customer_component.btn_cancel')?.toUpperCase() ?? 'CANCEL'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
          onDeleted();
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

CustomerItemComponent.defaultProps = {
  editable: true,
};

export default CustomerItemComponent;
