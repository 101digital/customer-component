import { StyleProp, ViewStyle } from 'react-native';
export type ShimmerItemStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  avatarContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
};

export type ShimmerItemProps = {
  style?: ShimmerItemStyles;
};
