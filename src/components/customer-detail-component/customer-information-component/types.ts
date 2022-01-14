import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type CustomerInformationProps = {
  defaultDueDays: number;
  onEdit: () => void;
  style?: CustomerInformationStyles;
};

export type CustomerInformationStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  itemLabelTextStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemValueTextStyle?: StyleProp<TextStyle>;
  deleteButtonStyle?: ButtonStyles;
  editButtonStyle?: ButtonStyles;
  shimmerLabelStyle?: StyleProp<ViewStyle>;
  shimmerValueStyle?: StyleProp<ViewStyle>;
};
