import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceSummaryStyles } from './types';

const useMergeStyles = (style?: InvoiceSummaryStyles): InvoiceSummaryStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: InvoiceSummaryStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 12.5,
      paddingVertical: 20,
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    itemContainerStyle: {
      flex: 1,
      height: 65,
      justifyContent: 'center',
      paddingHorizontal: 10,
      alignSelf: 'center',
      borderRadius: 5,
      marginHorizontal: 2.5,
      backgroundColor: '#F5F5F9',
    },
    itemLabelStyle: {
      fontFamily: fonts.regular,
      fontSize: 11,
    },
    itemValueStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: '#000000',
    },
    itemHeaderShimmerStyle: {
      flexDirection: 'row',
    },
    itemCountShimmerStyle: {
      width: '15%',
      height: 8,
      borderRadius: 4,
      marginRight: 5,
    },
    itemLabelShimmerStyle: {
      width: '60%',
      height: 8,
      borderRadius: 4,
    },
    itemValueShimmerStyle: {
      width: '50%',
      height: 8,
      borderRadius: 4,
      marginTop: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
