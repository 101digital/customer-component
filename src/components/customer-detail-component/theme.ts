import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { CustomerDetailComponentStyles } from './types';

const useMergeStyles = (style?: CustomerDetailComponentStyles): CustomerDetailComponentStyles => {
  const defaultStyles: CustomerDetailComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
