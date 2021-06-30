import React, {useRef} from 'react';
import {Animated, TouchableWithoutFeedback} from 'react-native';

interface IScale {
  onPress?(): void;
  outputRange?: number;
  styles?: any;
}

const ScaleTouchable: React.FunctionComponent<IScale> = ({
  onPress,
  children,
  outputRange = 0.5,
  styles,
}) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const interpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, outputRange],
  });

  const animatedStyle = {
    transform: [
      {
        scale: interpolation,
      },
    ],
  };

  const pressInAnimation = () => {
    Animated.spring(animationValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const pressOutAnimation = () => {
    Animated.spring(animationValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      style={styles}
      onPress={onPress}
      onPressIn={pressInAnimation}
      onPressOut={pressOutAnimation}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ScaleTouchable;
