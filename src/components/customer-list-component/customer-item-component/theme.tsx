import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CustomerItemStyles } from './types';

const useMergeStyles = (style?: CustomerItemStyles): CustomerItemStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CustomerItemStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingVertical: 12,
      alignItems: 'center',
    },
    avatarContainerStyle: {
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginLeft: 10,
    },
    avatarTextStyle: {
      fontFamily: fonts.bold,
      color: '#808080',
    },
    customerNameStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      flex: 1,
      marginLeft: 20,
      color: colors.primaryTextColor,
    },
    moreContainerStyle: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    actionButtonStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
    },
    actionTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.primaryTextColor,
      position: 'absolute',
      left: 50,
    },
    cancelButtonStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cancelTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: 'red',
    },
    actionsContainerStyle: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
