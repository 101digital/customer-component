import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CustomerTypeComponentStyles } from './types';

const useMergeStyles = (style?: CustomerTypeComponentStyles): CustomerTypeComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CustomerTypeComponentStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      borderRadius: 4,
      width: 240,
      backgroundColor: colors.secondaryButtonColor,
    },
    actionContainerStyle: {
      flex: 1,
      borderRadius: 4,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
