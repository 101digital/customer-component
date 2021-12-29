import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CheckIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 18} height={size ? size : 18} viewBox='0 0 18 18' fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9 18A9 9 0 109 0a9 9 0 000 18zm4.17-10.455a1.125 1.125 0 00-1.59-1.59L7.875 9.659 6.42 8.205a1.125 1.125 0 00-1.59 1.59l2.25 2.25a1.125 1.125 0 001.59 0l4.5-4.5z'
        fill={color ? color : '#fff'}
      />
    </Svg>
  );
};
export { CheckIcon };
