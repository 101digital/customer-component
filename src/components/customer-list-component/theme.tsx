import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { CustomerListComponentStyles } from './types';

const useMergeStyles = (style?: CustomerListComponentStyles): CustomerListComponentStyles => {
  const defaultStyles: CustomerListComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#f4f8fb',
    },
    contentContainerStyle: {
      flex: 1,
    },
    addButtonContainerStyle: {
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 15,
      right: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dividerStyle: {
      height: 1,
      backgroundColor: '#e2e2e2',
    },
    dividerContainerStyle: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: 'white',
    },
    loadMoreIndicatorStyle: {
      marginVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
