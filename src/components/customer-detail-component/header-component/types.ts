import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type HeaderDetailProps = {
  actions: string[];
  tabIndex: number;
  onChangedAction: (index: number) => void;
  activeBackgroundColor?: string;
  inActiveBackgrounColor?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  style?: HeaderDetailStyles;
};

export type HeaderDetailStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<TextStyle>;
};
