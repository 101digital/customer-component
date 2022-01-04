import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type CustomerTypeComponentProps = {
  type: number;
  onChangedValue: (type: number) => void;
  activeBackgroundColor?: string;
  inActiveBackgroundColor?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  style?: CustomerTypeComponentStyles;
};

export type CustomerTypeComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTitleStyle?: StyleProp<TextStyle>;
};
