import React from 'react';
import { Text, View } from 'react-native';
import { SectionHeaderProps, SectionHeaderStyles } from '../types';
import useMergeStyles from './theme';

const SectionHeaderComponent = (props: SectionHeaderProps) => {
  const { style, title } = props;
  const styles: SectionHeaderStyles = useMergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default SectionHeaderComponent;
