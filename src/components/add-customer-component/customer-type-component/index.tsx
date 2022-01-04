import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomerTypeComponentProps, CustomerTypeComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const CustomerTypeComponent = (props: CustomerTypeComponentProps) => {
  const {
    type,
    style,
    activeBackgroundColor,
    inActiveBackgroundColor,
    activeTextColor,
    inActiveTextColor,
    onChangedValue,
  } = props;

  const styles: CustomerTypeComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  const _activeBackgroundColor = activeBackgroundColor ?? colors.primaryButtonColor;
  const _inActiveBackgroundColor = inActiveBackgroundColor ?? 'transparent';
  const _activeTextColor = activeTextColor ?? colors.primaryButtonLabelColor;
  const _inActiveTextColor = inActiveTextColor ?? colors.secondaryButtonLabelColor;

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (type !== 0) {
            onChangedValue(0);
          }
        }}
        style={[
          styles.actionContainerStyle,
          { backgroundColor: type === 0 ? _activeBackgroundColor : _inActiveBackgroundColor },
        ]}
      >
        <Text
          style={[
            styles.actionTitleStyle,
            { color: type === 0 ? _activeTextColor : _inActiveTextColor },
          ]}
        >
          Individual
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (type !== 1) {
            onChangedValue(1);
          }
        }}
        style={[
          styles.actionContainerStyle,
          { backgroundColor: type === 1 ? _activeBackgroundColor : _inActiveBackgroundColor },
        ]}
      >
        <Text
          style={[
            styles.actionTitleStyle,
            { color: type === 1 ? _activeTextColor : _inActiveTextColor },
          ]}
        >
          Business
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerTypeComponent;
