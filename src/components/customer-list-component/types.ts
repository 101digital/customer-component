import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CustomerReference } from '../../types';

export type CustomerListComponentProps = {
  onAddCustomer: () => void;
  onEditCustomer: (customer: CustomerReference) => void;
  onCustomerDetail: (customer: CustomerReference) => void;
  addCustomerIcon?: ReactNode;
  indicatorColor?: string;
  style?: CustomerListComponentStyles;
  EmptyCustomer?: EmptyCustomerProps;
  Search?: {
    props?: {
      searchIcon?: ReactNode;
      placeholderColor?: string;
    };
    style?: SearchBoxStyles;
  };
  SectionHeader?: {
    style?: SectionHeaderStyles;
  };
  CustomerItem?: {
    props?: {
      moreIcon?: ReactNode;
      editIcon?: ReactNode;
      deleteIcon?: ReactNode;
    };
    style?: CustomerItemStyles;
  };
  Shimmer?: ShimmerItemProps;
  NoResult?: NoResultSearchProps;
  ErrorPanel?: ErrorLoadCustomerComponentProps;
};

export type SectionHeaderProps = {
  title: string;
  style?: SectionHeaderStyles;
};

export type SectionHeaderStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export type SearchBoxProps = {
  onSearch: (key: string) => void;
  searchIcon?: ReactNode;
  placeholderColor?: string;
  style?: SearchBoxStyles;
};

export type EmptyCustomerProps = {
  phoneBookIcon?: ReactNode;
  plusIcon?: ReactNode;
  onAddCustomer?: () => void;
  style?: EmptyCustomerStyles;
};

export type CustomerListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dividerContainerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  addButtonContainerStyle?: StyleProp<ViewStyle>;
  loadMoreIndicatorStyle?: StyleProp<ViewStyle>;
};

export type SearchBoxStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  searchIconContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputTextStyle?: StyleProp<TextStyle>;
};

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

export type EmptyCustomerStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  createButtonContainerStyle?: StyleProp<ViewStyle>;
  createButtonTextStyle?: StyleProp<TextStyle>;
};

export type ShimmerItemStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  avatarContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
};

export type ShimmerItemProps = {
  style?: ShimmerItemStyles;
};

export type CustomerListComponentRef = {
  clearSearch: () => void;
};

export type NoResultSearchProps = {
  noResultIcon?: ReactNode;
  style?: NoResultSearchStyles;
};

export type NoResultSearchStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export type ErrorLoadCustomerComponentProps = {
  errorIcon?: ReactNode;
  style?: ErrorLoadCustomerComponentStyles;
};

export type ErrorLoadCustomerComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  errorTitleStyle?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  retryButtonContainerStyle?: StyleProp<ViewStyle>;
  retryTextStyle?: StyleProp<TextStyle>;
};
