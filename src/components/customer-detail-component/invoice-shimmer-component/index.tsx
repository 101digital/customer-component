import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { InvoiceShimmerComponentProps, InvoiceShimmerComponentStyles } from './types';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import useMergeStyles from './theme';

const InvoiceShimmerComponent = (props: InvoiceShimmerComponentProps) => {
  const styles: InvoiceShimmerComponentStyles = useMergeStyles(props.style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.leftContainerStyle}>
        <ShimmerPlaceHolder shimmerStyle={styles.invoiceNumberStyle} />
        <ShimmerPlaceHolder shimmerStyle={styles.invoiceDescriptionStyle} />
        <ShimmerPlaceHolder shimmerStyle={styles.invoiceDateStyle} />
      </View>
      <View style={styles.rightContainerStyle}>
        <ShimmerPlaceHolder shimmerStyle={styles.invoiceAmountStyle} />
        <ShimmerPlaceHolder shimmerStyle={styles.invoiceStatusStyle} />
      </View>
    </View>
  );
};

export default InvoiceShimmerComponent;
