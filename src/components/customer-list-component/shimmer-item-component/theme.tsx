import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { ShimmerItemStyles } from './types';

const useMergeStyles = (style?: ShimmerItemStyles): ShimmerItemStyles => {
  const defaultStyles: ShimmerItemStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 15,
      backgroundColor: 'white',
      paddingHorizontal: 12,
      alignItems: 'center',
      flexDirection: 'row',
    },
    avatarContainerStyle: {
      width: 35,
      height: 35,
      borderRadius: 5,
    },
    contentContainerStyle: {
      flex: 1,
      height: 15,
      borderRadius: 5,
      marginHorizontal: 20,
    },
    moreContainerStyle: {
      width: 10,
      height: 20,
      borderRadius: 3,
      marginHorizontal: 10,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
