import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ContactAutoCompleteComponentStyles } from '../types';
const { width } = Dimensions.get('window');

const useMergeStyles = (
  style?: ContactAutoCompleteComponentStyles
): ContactAutoCompleteComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ContactAutoCompleteComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 15,
      width: width - 33,
      maxHeight: 250,
      borderRadius: 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: Platform.OS === 'ios' ? 1 : 4,
      position: 'absolute',
      backgroundColor: '#ffffff',
      marginTop: 3,
      zIndex: 2,
    },
    itemContainerStyle: {
      borderBottomColor: '#f4f8fb',
      borderBottomWidth: 2,
      paddingVertical: 10,
    },
    itemContactNameStyle: {
      color: '#09101d',
      fontSize: 14,
      fontFamily: fonts.medium,
    },
    itemContactInfoStyle: {
      color: '#09101d',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
