import { isEmpty } from 'lodash';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { showMessage, ThemeContext } from 'react-native-theme-component';
import { AddCustomerIcon } from '../../assets';
import { CustomerContext } from '../../context/customer-context';
import { isCloseToBottom } from '../../utils/helper';
import CustomerItemComponent from './customer-item-component';
import EmptyCustomerComponent from './empty-customer-component';
import ErrorLoadCustomerComponent from './error-load-customer';
import NoResultComponent from './no-result-component';
import SearchBoxComponent, { SearchBoxComponentRefs } from './search-box-component';
import SectionHeaderComponent from './section-header-component';
import ShimmerItemComponent from './shimmer-item-component';
import useMergeStyles from './theme';
import {
  CustomerListComponentProps,
  CustomerListComponentRef,
  CustomerListComponentStyles,
} from './types';

const CustomerListComponent = forwardRef((props: CustomerListComponentProps, ref) => {
  const {
    style,
    onAddCustomer,
    onCustomerDetail,
    onEditCustomer,
    EmptyCustomer,
    Search,
    addCustomerIcon,
    indicatorColor,
    SectionHeader,
    CustomerItem,
    Shimmer,
    ErrorPanel,
    NoResult,
  } = props;
  const [keyword, setKeyword] = useState<string>('');
  const {
    customers,
    getCustomers,
    isLoadingCustomers,
    isRefreshingCustomers,
    refreshCustomers,
    errorLoadCustomer,
    deleteCustomer,
    isDeleteSuccessful,
  } = useContext(CustomerContext);

  const { colors, i18n } = useContext(ThemeContext);
  const searchRef = useRef<SearchBoxComponentRefs>();

  const styles: CustomerListComponentStyles = useMergeStyles(style);

  useEffect(() => {
    if (isDeleteSuccessful) {
      showMessage({
        message: i18n?.t(
          'customer_component.msg_deleted_successful' ?? 'Customer deleted successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isDeleteSuccessful]);

  useImperativeHandle(
    ref,
    (): CustomerListComponentRef => ({
      clearSearch,
    })
  );

  useEffect(() => {
    if (isEmpty(customers.data) && !isRefreshingCustomers && !isLoadingCustomers) {
      getCustomers({ pageNum: 1 });
    }
  }, []);

  const _loadMoreCustomers = () => {
    if (customers.paging && !errorLoadCustomer) {
      const { pageNumber, totalRecords, pageSize } = customers.paging;
      if (!isLoadingCustomers && !isRefreshingCustomers && pageNumber * pageSize < totalRecords) {
        getCustomers({ pageNum: pageNumber + 1 });
      }
    }
  };

  const _renderContent = () => {
    if (!isLoadingCustomers && errorLoadCustomer) {
      return <ErrorLoadCustomerComponent {...ErrorPanel} />;
    }
    if (!customers.paging || (isLoadingCustomers && isEmpty(customers.data))) {
      return (
        <FlatList
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
          ItemSeparatorComponent={() => (
            <View style={styles.dividerContainerStyle}>
              <View style={styles.dividerStyle} />
            </View>
          )}
          data={Array.from({ length: 15 }).map((_, index) => index)}
          renderItem={() => <ShimmerItemComponent {...Shimmer} />}
        />
      );
    }
    if (!isLoadingCustomers && isEmpty(customers.data)) {
      if (isEmpty(keyword)) {
        return (
          <EmptyCustomerComponent
            {...EmptyCustomer}
            onAddCustomer={() => {
              clearSearch();
              EmptyCustomer?.onAddCustomer?.() ?? onAddCustomer();
            }}
          />
        );
      } else {
        return <NoResultComponent {...NoResult} />;
      }
    }
    if (!isEmpty(customers.groupedData))
      return (
        <>
          <KeyboardAwareSectionList
            keyboardShouldPersistTaps='handled'
            keyExtractor={(item) => item.id.toString()}
            sections={customers.groupedData}
            showsVerticalScrollIndicator={false}
            initialNumToRender={30}
            renderItem={({ item }) => (
              <CustomerItemComponent
                customer={item}
                onPressed={() => {
                  clearSearch();
                  onCustomerDetail(item);
                }}
                onDeleted={() => {
                  clearSearch();
                  deleteCustomer(item.id);
                }}
                onEdit={() => {
                  clearSearch();
                  onEditCustomer(item);
                }}
                style={CustomerItem?.style}
                {...CustomerItem?.props}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeaderComponent style={SectionHeader?.style} title={title.toUpperCase()} />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.dividerContainerStyle}>
                <View style={styles.dividerStyle} />
              </View>
            )}
            scrollEventThrottle={400}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshingCustomers}
                onRefresh={() => {
                  if (!isRefreshingCustomers) {
                    refreshCustomers();
                  }
                }}
                tintColor={indicatorColor ?? colors.primaryColor}
              />
            }
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                _loadMoreCustomers();
              }
            }}
            ListFooterComponent={() =>
              isLoadingCustomers ? (
                <View style={styles.loadMoreIndicatorStyle}>
                  <ActivityIndicator color={indicatorColor ?? colors.primaryColor} />
                </View>
              ) : (
                <View />
              )
            }
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addButtonContainerStyle}
            onPress={() => {
              clearSearch();
              onAddCustomer();
            }}
          >
            {addCustomerIcon ?? <AddCustomerIcon color={colors.primaryButtonColor} />}
          </TouchableOpacity>
        </>
      );
    return <View />;
  };

  const _searchCustomer = (key: string) => {
    getCustomers({ pageNum: 1, keyword: key });
    setKeyword(key);
  };

  const clearSearch = () => {
    if (!isEmpty(keyword)) {
      searchRef?.current?.clearSearch();
    }
  };

  return (
    <View style={styles.containerStyle}>
      <SearchBoxComponent
        ref={searchRef}
        onSearch={_searchCustomer}
        style={Search?.style}
        {...Search?.props}
      />
      <View style={styles.contentContainerStyle}>{_renderContent()}</View>
    </View>
  );
});

export default CustomerListComponent;
