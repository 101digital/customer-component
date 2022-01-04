import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { PermissionWarningComponentStyles } from './types';

const useMergeStyles = (
  style?: PermissionWarningComponentStyles
): PermissionWarningComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: PermissionWarningComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#F6CC7C',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageStyle: {
      flex: 1,
      marginLeft: 10,
      color: '#555555',
      fontFamily: fonts.regular,
    },
    openSettingStyle: {
      color: '#4E7ED8',
      fontFamily: fonts.bold,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
