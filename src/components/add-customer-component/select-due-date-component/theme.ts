import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectDueDateComponentStyles } from '../types';

const useMergeStyles = (style?: SelectDueDateComponentStyles): SelectDueDateComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: SelectDueDateComponentStyles = StyleSheet.create({
    headerTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      fontWeight: '600',
      color: '#000',
      textAlign: 'center',
      marginBottom: 15,
    },
    itemTextStyle: {
      width: '100%',
      fontFamily: fonts.medium,
      fontSize: 14,
      textAlign: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
    itemContainerStyle: {
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: 'red',
      marginVertical: 2.5,
    },
    suffixContainerStyle: {
      position: 'absolute',
      right: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
