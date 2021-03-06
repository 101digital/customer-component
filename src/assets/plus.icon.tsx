import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const PlusIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <SvgCss
      xml={`<?xml version="1.0" encoding="iso-8859-1"?>
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve">
  <g>
      <g>
          <path d="M213.333,0C95.467,0,0,95.467,0,213.333s95.467,213.333,213.333,213.333S426.667,331.2,426.667,213.333S331.2,0,213.333,0
              z M320,234.667h-85.333V320H192v-85.333h-85.333V192H192v-85.333h42.667V192H320V234.667z"/>
      </g>
  </g>
  </svg>
  `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { PlusIcon };
