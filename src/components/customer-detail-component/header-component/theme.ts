import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { HeaderDetailStyles } from '../types';

const useMergeStyles = (style?: HeaderDetailStyles): HeaderDetailStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: HeaderDetailStyles = StyleSheet.create({
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
      paddingTop: 15,
      paddingBottom: 10,
      paddingHorizontal: 10,
      flexDirection: 'row',
      zIndex: 2,
    },
    actionContainerStyle: {
      backgroundColor: '#FA4147',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      borderRadius: 5,
      height: 40,
    },
    actionTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#000',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
