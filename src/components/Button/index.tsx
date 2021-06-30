import React, {FC} from 'react';

import {Text, ActivityIndicator, View} from 'react-native';
import ScaleTouchable from '../Scale';

import styles from './styles';

interface IButton {
  loading?: boolean;
  onlyIcon: boolean;
  scale?: boolean;
  onPress(): void;
  style?: any;
  children: JSX.Element;
}

export const Component: FC<IButton> = ({
  loading,
  onlyIcon,
  scale = true,
  ...props
}: IButton) => {
  const onPress = () => {
    if (!loading && props.onPress) {
      props.onPress();
    }
  };
  return (
    <ScaleTouchable {...props} onPress={onPress} outputRange={!scale ? 1 : 0.5}>
      <View style={[!onlyIcon && styles.button, props.style]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'white'} />
          </View>
        )}
        {onlyIcon ? (
          <View>{props.children}</View>
        ) : (
          <View>
            <Text style={styles.buttonText}>{props.children}</Text>
          </View>
        )}
      </View>
    </ScaleTouchable>
  );
};

Component.defaultProps = {
  style: {},
};

export default Component;
