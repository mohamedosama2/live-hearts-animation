import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Heart = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const start = getRandomInt(100, width - 100);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: height + 60,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  const dividedHeight = height / 6;

  const positionInterpolate = animation.interpolate({
    inputRange: [0, height],
    outputRange: [height - 50, 0],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, height - 100],
    outputRange: [1, 0],
  });

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.2, 1],
    extrapolate: "clamp",
  });

  const wobbleInterpolate = animation.interpolate({
    inputRange: [
      0,
      dividedHeight * 1,
      dividedHeight * 2,
      dividedHeight * 3,
      dividedHeight * 4,
      dividedHeight * 5,
      dividedHeight * 6,
    ],
    outputRange: [0, 15, -15, 15, -15, 15, -15],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[
        styles.heart,
        {
          left: start,
          transform: [
            { translateY: positionInterpolate },
            { translateX: wobbleInterpolate },
            { scale: scaleInterpolate },
          ],
          opacity: opacityInterpolate,
        },
      ]}
    >
      <View style={[styles.heartShape, styles.left]} />
      <View style={[styles.heartShape, styles.right]} />
    </Animated.View>
  );
};

export default React.memo(Heart);

const styles = StyleSheet.create({
  heart: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  heartShape: {
    backgroundColor: "tomato",
    height: 45,
    width: 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    position: "absolute",
    top: 0,
  },
  left: {
    left: 5,
    transform: [{ rotate: "-45deg" }],
  },
  right: {
    right: 5,
    transform: [{ rotate: "45deg" }],
  },
});
