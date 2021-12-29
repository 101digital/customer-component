import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { NoResultSearchStyles } from '../types';

const useMergeStyles = (style?: NoResultSearchStyles): NoResultSearchStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: NoResultSearchStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: '#0d2050',
      marginTop: 24,
      textAlign: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
