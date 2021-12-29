import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';
import { CustomerReference, PaymentTerm } from '../../types';

export type AddCustomerComponentProps = {
  customer?: CustomerReference;
  defaultDueDays: number;
  paymentTerms?: PaymentTerm[];
  arrowDownIcon?: ReactNode;
  activeBorderColor?: string;
  onCreatedCustomer: (customer: CustomerReference) => void;
  onUpdatedCustomer: (customer: CustomerReference) => void;
  style?: AddCustomerComponentStyles;
  CustomerType?: {
    props: {
      activeBackgroundColor?: string;
      inActiveBackgroundColor?: string;
      activeTextColor?: string;
      inActiveTextColor?: string;
    };
    style?: CustomerTypeComponentStyles;
  };
  PermissionWarning?: PermissionWarningComponentProps;
  ContactAutoComplete?: {
    style?: ContactAutoCompleteComponentStyles;
  };
  SelectDueDate?: {
    props?: {
      activeBackgroundColor?: string;
      inActiveBackgroundColor?: string;
      activeTextColor?: string;
      inActiveTextColor?: string;
    };
    style?: SelectDueDateComponentStyles;
  };
};

export type AddCustomerComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  suffixIconStyle?: StyleProp<ViewStyle>;
  buttonStyle?: ButtonStyles;
};

export type CustomerTypeComponentProps = {
  type: number;
  onChangedValue: (type: number) => void;
  activeBackgroundColor?: string;
  inActiveBackgroundColor?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  style?: CustomerTypeComponentStyles;
};

export type CustomerTypeComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTitleStyle?: StyleProp<TextStyle>;
};

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

export type ContactAutoCompleteComponentProps = {
  position: number;
  contacts: any[];
  onSelected: (name: any, phoneNumber?: string, email?: string) => void;
  style?: ContactAutoCompleteComponentStyles;
};

export type ContactAutoCompleteComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemContactNameStyle?: StyleProp<TextStyle>;
  itemContactInfoStyle?: StyleProp<TextStyle>;
};

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
