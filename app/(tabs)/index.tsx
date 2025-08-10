import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Bienvenido</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaffea",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default Home;
