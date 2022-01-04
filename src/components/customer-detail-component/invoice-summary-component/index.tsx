import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InvoiceSummaryProps, InvoiceSummaryStyles } from './types';
import { addAlpha } from '../../../utils/helper';
import { CustomerContext } from '../../../context/customer-context';
import { ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const InvoiceSummaryComponent = (props: InvoiceSummaryProps) => {
  const { style, currencyCode, paidColor, dueColor, overdueColor, colorOpacity } = props;
  const styles: InvoiceSummaryStyles = useMergeStyles(style);
  const { isLoadingSummary, customerSummary } = useContext(CustomerContext);
  const { i18n } = useContext(ThemeContext);

  const _paidColor = paidColor ?? '#00CD5F';
  const _dueColor = dueColor ?? '#FFAD33';
  const _overdueColor = overdueColor ?? '#DB0011';

  const _renderSummaryItem = (
    label: string,
    count: number,
    amount: number,
    color: string,
    onPress: () => void
  ) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainerStyle,
          { backgroundColor: addAlpha(color, colorOpacity ?? 0.1) },
        ]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text>
          <Text adjustsFontSizeToFit style={styles.itemValueStyle}>
            {count}
          </Text>{' '}
          <Text adjustsFontSizeToFit style={[styles.itemLabelStyle, { color }]}>
            {label}
          </Text>
        </Text>
        <Text adjustsFontSizeToFit style={styles.itemValueStyle}>
          {useCurrencyFormat(amount, currencyCode)}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderShimmerItem = () => {
    return (
      <View style={styles.itemContainerStyle}>
        <View style={styles.itemHeaderShimmerStyle}>
          <ShimmerPlaceHolder shimmerStyle={styles.itemCountShimmerStyle} />
          <ShimmerPlaceHolder shimmerStyle={styles.itemLabelShimmerStyle} />
        </View>
        <ShimmerPlaceHolder shimmerStyle={styles.itemValueShimmerStyle} />
      </View>
    );
  };

  return (
    <View style={styles.containerStyle}>
      {isLoadingSummary
        ? _renderShimmerItem()
        : _renderSummaryItem(
            i18n?.t('customer_component.lbl_paid_invoice') ?? 'Paid',
            customerSummary?.numberOfPaid ?? 0,
            customerSummary?.totalPaidAmount ?? 0,
            _paidColor,
            () => {}
          )}
      {isLoadingSummary
        ? _renderShimmerItem()
        : _renderSummaryItem(
            i18n?.t('customer_component.lbl_due_invoice') ?? 'Due',
            customerSummary?.numberOfDue ?? 0,
            customerSummary?.invoiceTotalDue ?? 0,
            _dueColor,
            () => {}
          )}
      {isLoadingSummary
        ? _renderShimmerItem()
        : _renderSummaryItem(
            i18n?.t('customer_component.lbl_overdue_invoice') ?? 'Overdue',
            customerSummary?.numberOfOverDue ?? 0,
            customerSummary?.invoiceTotalOverDue ?? 0,
            _overdueColor,
            () => {}
          )}
    </View>
  );
};

export default InvoiceSummaryComponent;
