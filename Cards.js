import clamp from "clamp";
import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, PanResponder } from "react-native";

const Cards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      image:
        "https://www.man-shop.eu/media/image/19/07/c7/HerrenBz6datKT7kMmG.png",
    },
    {
      id: 2,
      image:
        "https://classic1073.org/wp-content/uploads/2021/08/edward-watts.jpg",
    },
    {
      id: 3,
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F11%2F13%2Fdwayne-johnson.jpg",
    },
    {
      id: 4,
      image:
        "https://i.insider.com/5dc098e0d8d84605b9674ef9?width=1000&format=jpeg&auto=webp",
    },
  ]);

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const animation = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    opacity.setValue(1);
    scale.setValue(0.9);
    animation.setValue({ x: 0, y: 0 });
  }, [cards]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event(
        [null, { dx: animation.x, dy: animation.y }],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          //convert velocity to positive
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > 200) {
          Animated.decay(animation, {
            velocity: { x: velocity, y: vy },
            useNativeDriver: true,
            deceleration: 0.98,
          }).start(nextHandler);
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const nextHandler = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setCards((prev) => {
        if (prev.length > 0) return prev.slice(1);
      });
    });
  };

  const opacityInterpolation = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });
  const rotateInterpolation = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: "clamp",
  });
  const scaleInterpolate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.9, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        cards
          .slice(0, 2)
          .reverse()
          .map((item, index, items) => {
            const isLastItem = items.length - 1 === index;
            const styleView = {
              transform: isLastItem
                ? [
                    ...animation.getTranslateTransform(),
                    { rotate: rotateInterpolation },
                  ]
                : [{ scale: scaleInterpolate }],
            };
            const pan = isLastItem ? panResponder.panHandlers : {};

            const imageStyle = {
              opacity: isLastItem ? opacityInterpolation : 1,
            };
            return (
              <Animated.View
                style={[styles.card, styleView]}
                key={item.id}
                {...pan}
              >
                <Animated.Image
                  style={[styles.image, imageStyle]}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text style={styles.text}>some texts</Text>
              </Animated.View>
            );
          })
      ) : (
        <Text>No Cards</Text>
      )}
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    elevation: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: "#fff",
    shadowOpacity: 0.1,
    height: 300,
    width: 300,
    position: "absolute",
  },
  image: {
    height: null,
    width: null,
    flex: 3,
    borderRadius: 2,
  },
  text: { flex: 1, backgroundColor: "#fff", padding: 5, fontSize: 18 },
});
