import { ThemeContext } from 'react-native-theme-component';
import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { SectionHeaderStyles } from '../types';
import { useContext } from 'react';

const useMergeStyles = (style?: SectionHeaderStyles): SectionHeaderStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: SectionHeaderStyles = StyleSheet.create({
    containerStyle: {
      paddingLeft: 15,
      paddingVertical: 10,
      backgroundColor: '#f4f8fb',
    },
    titleStyle: {
      fontFamily: fonts.regular,
      color: '#0d2050',
      fontSize: 13,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
