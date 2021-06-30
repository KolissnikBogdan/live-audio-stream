import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MicrophoneOff(props) {
  return (
    <Svg
      fill="none"
      height={40}
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M1 1l22 22M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
      <Path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23M12 19v4M8 23h8" />
    </Svg>
  );
}

export default MicrophoneOff;
