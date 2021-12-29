import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddCustomerComponentStyles } from './types';

const useMergeStyles = (style?: AddCustomerComponentStyles): AddCustomerComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: AddCustomerComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop: 10,
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    footerContainerStyle: {
      width: '100%',
      paddingVertical: 10,
      backgroundColor: '#FFF',
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
    },
    labelTextStyle: {
      marginBottom: 5,
      color: '#0d2050',
      fontSize: 13,
      fontFamily: fonts.medium,
      marginTop: 15,
    },
    suffixIconStyle: {
      paddingHorizontal: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
