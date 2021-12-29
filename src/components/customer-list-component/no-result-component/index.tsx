import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { NoResultSearchProps, NoResultSearchStyles } from '../types';
import { Text, View } from 'react-native';
import { NoResultIcon } from '../../../assets';
import { ThemeContext } from 'react-native-theme-component';

const NoResultComponent = (props: NoResultSearchProps) => {
  const { style, noResultIcon } = props;
  const styles: NoResultSearchStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {noResultIcon ?? <NoResultIcon />}
      <Text style={styles.titleStyle}>
        {i18n?.t('customer_component.msg_no_results') ?? 'No results'}
      </Text>
    </View>
  );
};

export default NoResultComponent;
