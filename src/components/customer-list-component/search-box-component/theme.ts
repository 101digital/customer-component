import { ThemeContext } from 'react-native-theme-component';
import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { SearchBoxStyles } from '../types';
import { useContext } from 'react';

const useMergeStyles = (style?: SearchBoxStyles): SearchBoxStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: SearchBoxStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      elevation: 3,
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      zIndex: 2,
    },
    contentContainerStyle: {
      flexDirection: 'row',
      height: 42,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#f4f8fb',
      flex: 1,
    },
    searchIconContainerStyle: {
      paddingHorizontal: 15,
    },
    inputTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#0d2050',
      flex: 1,
      textAlignVertical: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
