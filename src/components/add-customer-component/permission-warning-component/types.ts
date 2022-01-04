import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type PermissionWarningComponentProps = {
  appName?: string;
  warningIcon?: ReactNode;
  style?: PermissionWarningComponentStyles;
};

export type PermissionWarningComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  openSettingStyle?: StyleProp<TextStyle>;
};
