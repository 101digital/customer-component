import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CustomerReference } from '../../types';
import { CustomerItemStyles } from './customer-item-component/types';
import { EmptyCustomerProps } from './empty-customer-component/types';
import { ErrorLoadCustomerComponentProps } from './error-load-customer/types';
import { NoResultSearchProps } from './no-result-component/types';
import { SearchBoxStyles } from './search-box-component/types';
import { SectionHeaderStyles } from './section-header-component/types';
import { ShimmerItemProps } from './shimmer-item-component/types';

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
      editable?: boolean;
    };
    style?: CustomerItemStyles;
  };
  Shimmer?: ShimmerItemProps;
  NoResult?: NoResultSearchProps;
  ErrorPanel?: ErrorLoadCustomerComponentProps;
};

export type CustomerListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dividerContainerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  addButtonContainerStyle?: StyleProp<ViewStyle>;
  loadMoreIndicatorStyle?: StyleProp<ViewStyle>;
};

export type CustomerListComponentRef = {
  clearSearch: () => void;
};
