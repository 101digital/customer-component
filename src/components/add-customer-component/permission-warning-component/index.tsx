import { WarningIcon } from '../../../assets';
import React, { useContext } from 'react';
import { Alert, Linking, Platform, Text, View } from 'react-native';
// @ts-ignore
import IntentLauncher from 'react-native-intent-launcher';
import DeviceInfo from 'react-native-device-info';
import { PermissionWarningComponentProps, PermissionWarningComponentStyles } from './types';
import useMergeStyles from './theme';
import { ThemeContext } from 'react-native-theme-component';

const PermissionWarningComponent = (props: PermissionWarningComponentProps) => {
  const { style, appName, warningIcon } = props;
  const styles: PermissionWarningComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  const pkg = DeviceInfo.getBundleId();
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncher.startActivity({
        action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
        data: 'package:' + pkg,
      });
    }
  };

  const showPermissionAlert = () => {
    Alert.alert(
      (
        i18n?.t('customer_component.lbl_allow_access_contact') ?? 'Allow %s To Access Your Contacts'
      ).replace('%s', appName ?? 'Application'),
      i18n?.t('customer_component.msg_allow_access_contact') ??
        'Tap Open Settings and turn on Contacts to allow access.',
      [
        {
          text: i18n?.t('customer_component.btn_cancel') ?? 'Cancel',
        },
        {
          text: i18n?.t('customer_component.btn_open_settings') ?? 'Open Settings',
          onPress: () => openAppSettings(),
        },
      ]
    );
  };

  return (
    <View style={styles.containerStyle}>
      {warningIcon ?? <WarningIcon size={33} />}
      <Text style={styles.messageStyle}>
        {(
          i18n?.t('customer_component.msg_warning_permission1') ??
          'Allow %s access to your device contacts to add your contacts as customers. To do this, tap on '
        ).replace('%s', appName ?? 'application')}
        <Text style={styles.openSettingStyle} onPress={showPermissionAlert}>
          {i18n?.t('customer_component.btn_device_setting') ?? 'Settings'}
        </Text>
        {i18n?.t('customer_component.msg_warning_permission2') ?? ' and turn on Contacts'}
      </Text>
    </View>
  );
};

export default PermissionWarningComponent;
