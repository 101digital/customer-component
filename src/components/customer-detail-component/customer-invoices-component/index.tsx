import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SectionList, Text, View } from 'react-native';
import { CustomerInvoiceComponentProps, CustomerInvoiceComponentStyles } from './types';
import { CustomerContext } from '../../../context/customer-context';
import { isEmpty } from 'lodash';
import CustomerEmptyInvoiceComponent from '../customer-empty-invoice-component';
import ItemInvoiceComponent from '../invoice-item-component';
import moment from 'moment';
import { ThemeContext } from 'react-native-theme-component';
import { isCloseToBottom } from '../../../utils/helper';
import InvoiceShimmerComponent from '../invoice-shimmer-component';

const CustomerInvoicesComponent = (props: CustomerInvoiceComponentProps) => {
  const {
    style,
    EmptyInvoice,
    InvoiceItem,
    onInvoiceActions,
    onInvoiceDetails,
    indicatorColor,
    InvoiceShimmer,
  } = props;
  const styles: CustomerInvoiceComponentStyles = useMergeStyles(style);
  const { allInvoices, refreshCustomerInvoice, customerDetails, getCustomerInvoice } = useContext(
    CustomerContext
  );
  const { colors } = useContext(ThemeContext);

  const refreshInvoice = () => {
    refreshCustomerInvoice({ customerId: customerDetails?.id });
  };

  const _loadMoreInvoice = () => {
    if (allInvoices.paging && !allInvoices.error) {
      const { pageNumber, totalRecords, pageSize } = allInvoices.paging;
      if (
        !allInvoices.isLoading &&
        !allInvoices.isRefreshing &&
        pageNumber * pageSize < totalRecords
      ) {
        getCustomerInvoice({ pageNum: pageNumber + 1, customerId: customerDetails?.id });
      }
    }
  };

  if (!allInvoices.paging || (allInvoices.isLoading && isEmpty(allInvoices.data))) {
    return (
      <FlatList
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        data={Array.from({ length: 15 }).map((_, index) => index)}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
        renderItem={() => <InvoiceShimmerComponent {...InvoiceShimmer} />}
      />
    );
  }

  if (!allInvoices.isLoading && isEmpty(allInvoices.data)) {
    return <CustomerEmptyInvoiceComponent {...EmptyInvoice} />;
  }

  return (
    <View style={styles.containerStyle}>
      <SectionList
        keyExtractor={(item) => item.invoiceId.toString()}
        sections={allInvoices.groupedData}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        renderItem={({ item }) => (
          <ItemInvoiceComponent
            onPressed={onInvoiceDetails}
            onMoreAction={onInvoiceActions}
            invoice={item}
            {...InvoiceItem?.props}
            style={InvoiceItem?.style}
          />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <View style={styles.sectionContainerStyle}>
            <Text style={styles.sectionTextStyle}>{moment(date).format('MMM YYYY')}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
        ListFooterComponent={() =>
          allInvoices.isLoading ? (
            <View style={styles.loadMoreIndicatorStyle}>
              <ActivityIndicator color={indicatorColor ?? colors.primaryColor} />
            </View>
          ) : (
            <View />
          )
        }
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            _loadMoreInvoice();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={allInvoices.isRefreshing}
            onRefresh={refreshInvoice}
            tintColor={indicatorColor ?? colors.primaryColor}
          />
        }
      />
    </View>
  );
};

export default CustomerInvoicesComponent;
