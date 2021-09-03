import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Heart from "./Heart";

const HeartLove = () => {
  const [hearts, setHearts] = useState([]);
  const pressHandler = () => {
    const index = hearts.length;
    const newArr = [...hearts, { index }];
    setHearts(newArr);
  };

  return (
    <View style={[styles.container, { marginTop: 20 }]}>
      <TouchableWithoutFeedback onPress={pressHandler}>
        <View style={styles.container}>
          {hearts.map(({ index }) => {
            return <Heart key={index} />;
          })}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default React.memo(HeartLove);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
});
