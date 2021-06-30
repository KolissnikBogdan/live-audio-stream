import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function Speaker(props) {
  return (
    <Svg
      height={40}
      viewBox="0 0 24 24"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill="#000"
        d="M21 0H3c-.6 0-1 .4-1 1v22c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 22H4V2h16v20z"
      />
      <Path
        fill="#000"
        d="M12 20c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm0-11c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"
      />
      <Path
        fill="#000"
        d="M12 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
      />
      <Circle fill="#000" cx={7} cy={5} r={1} />
      <Circle fill="#000" cx={17} cy={5} r={1} />
    </Svg>
  );
}

export default Speaker;
