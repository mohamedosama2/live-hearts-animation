import React from "react";
import { StyleSheet, View } from "react-native";
import HeartLove from "./HeartLove";

export default function App() {
  return (
    <View style={styles.container}>
      <HeartLove />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
