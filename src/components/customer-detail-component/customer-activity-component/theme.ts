import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { CustomerActivityStyles } from '../types';

const useMergeStyles = (style?: CustomerActivityStyles): CustomerActivityStyles => {
  const defaultStyles: CustomerActivityStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
