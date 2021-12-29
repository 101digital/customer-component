import React from 'react';
import { View } from 'react-native';
import { ShimmerItemProps, ShimmerItemStyles } from '../types';
import useMergeStyles from './theme';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ShimmerItemComponent = (props: ShimmerItemProps) => {
  const styles: ShimmerItemStyles = useMergeStyles(props.style);
  return (
    <View style={styles.containerStyle}>
      <ShimmerPlaceHolder shimmerStyle={styles.avatarContainerStyle} />
      <ShimmerPlaceHolder shimmerStyle={styles.contentContainerStyle} />
      <ShimmerPlaceHolder shimmerStyle={styles.moreContainerStyle} />
    </View>
  );
};

export default ShimmerItemComponent;
