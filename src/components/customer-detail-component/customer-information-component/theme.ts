import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CustomerInformationStyles } from './types';

const useMergeStyles = (style?: CustomerInformationStyles): CustomerInformationStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CustomerInformationStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    footerContainerStyle: {
      paddingVertical: 10,
      backgroundColor: '#FFF',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 15,
    },
    itemLabelTextStyle: {
      color: colors.primaryTextColor,
      fontSize: 13,
      fontFamily: fonts.medium,
      marginTop: 10,
    },
    itemContainerStyle: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
      borderColor: '#e2e2e2',
      borderWidth: 1,
      backgroundColor: '#F5F5F9',
      marginTop: 5,
    },
    itemValueTextStyle: {
      color: colors.primaryTextColor,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    shimmerLabelStyle: {
      height: 12,
      borderRadius: 5,
      width: 150,
      marginTop: 25,
      marginHorizontal: 15,
    },
    shimmerValueStyle: {
      height: 15,
      borderRadius: 5,
      marginTop: 10,
      marginHorizontal: 15,
      width: '90%',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
