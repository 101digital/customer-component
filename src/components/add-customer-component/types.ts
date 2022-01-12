import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';
import { CustomerReference, PaymentTerm } from '../../types';
import { ContactAutoCompleteComponentStyles } from './contact-auto-complete-component/types';
import { CustomerTypeComponentStyles } from './customer-type-component/types';
import { PermissionWarningComponentProps } from './permission-warning-component/types';
import { SelectDueDateComponentStyles } from './select-due-date-component/types';

export type AddCustomerComponentProps = {
  customer?: CustomerReference;
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
