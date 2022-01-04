import { CustomerReference } from './../../../types';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CustomerItemProps = {
  customer: CustomerReference;
  moreIcon?: ReactNode;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  onPressed: () => void;
  onDeleted: () => void;
  onEdit: () => void;
  style?: CustomerItemStyles;
};

export type CustomerItemStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  avatarContainerStyle?: StyleProp<ViewStyle>;
  avatarTextStyle?: StyleProp<TextStyle>;
  customerNameStyle?: StyleProp<TextStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  actionButtonStyle?: StyleProp<ViewStyle>;
  actionTitleStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
};