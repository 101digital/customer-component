import useMergeStyles from './theme';
import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HeaderDetailProps, HeaderDetailStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const HeaderDetailComponent = (props: HeaderDetailProps) => {
  const {
    style,
    actions,
    activeBackgroundColor,
    inActiveBackgrounColor,
    activeTextColor,
    inActiveTextColor,
    onChangedAction,
    tabIndex,
  } = props;
  const { colors } = useContext(ThemeContext);
  const styles: HeaderDetailStyles = useMergeStyles(style);
  const [activeIndex, setActiveIndex] = useState(tabIndex);

  const _activeBackgroundColor = activeBackgroundColor ?? colors.primaryButtonColor;
  const _inActiveBackgroundColor = inActiveBackgrounColor ?? colors.secondaryButtonColor;
  const _activeTextColor = activeTextColor ?? colors.primaryButtonLabelColor;
  const _inActiveTextColor = inActiveTextColor ?? colors.secondaryButtonLabelColor;

  return (
    <View style={styles.containerStyle}>
      {actions.map((action, index) => {
        const _isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={action}
            style={[
              styles.actionContainerStyle,
              {
                backgroundColor: _isActive ? _activeBackgroundColor : _inActiveBackgroundColor,
              },
            ]}
            activeOpacity={1}
            onPress={() => {
              if (!_isActive) {
                setActiveIndex(index);
                onChangedAction(index);
              }
            }}
          >
            <Text
              style={[
                styles.actionTextStyle,
                { color: _isActive ? _activeTextColor : _inActiveTextColor },
              ]}
            >
              {action}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HeaderDetailComponent;
