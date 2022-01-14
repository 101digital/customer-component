import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyInvoiceComponentStyles } from './types';

const useMergeStyles = (style?: EmptyInvoiceComponentStyles): EmptyInvoiceComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);
  const defaultStyles: EmptyInvoiceComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      marginHorizontal: 30,
      textAlign: 'center',
      marginTop: 20,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
