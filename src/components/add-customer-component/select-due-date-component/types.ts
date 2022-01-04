import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { PaymentTerm } from './../../../types';
export type SelectDueDateComponentProps = {
  isVisible: boolean;
  defaultDueDays: number;
  terms: PaymentTerm[];
  onClose: () => void;
  activeBackgroundColor?: string;
  inActiveBackgroundColor?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  style?: SelectDueDateComponentStyles;
  value?: PaymentTerm;
  onChangedValue: (value?: PaymentTerm) => void;
};

export type SelectDueDateComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
};
