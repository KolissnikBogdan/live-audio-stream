import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Record(props) {
  return (
    <Svg
      baseProfile="tiny"
      height={40}
      viewBox="0 0 24 24"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.on ? (
        <Path
          fill="#000"
          d="M12 8c2.205 0 4 1.794 4 4s-1.795 4-4 4-4-1.794-4-4 1.795-4 4-4m0-2a6 6 0 100 12 6 6 0 000-12z"
        />
      ) : (
        <Path
          fill="#000"
          d="M18 12a5.985 5.985 0 00-1.757-4.243A5.985 5.985 0 0012 6a5.985 5.985 0 00-4.242 1.757A5.982 5.982 0 006 12c0 1.656.672 3.156 1.758 4.242S10.344 18 12 18a5.982 5.982 0 004.243-1.758A5.985 5.985 0 0018 12z"
        />
      )}
    </Svg>
  );
}

export default Record;
