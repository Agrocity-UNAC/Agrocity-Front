import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/inicio/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/LogoAgrocity.png")} style={styles.logo} />
      <Text style={styles.title}>Agrocity</Text>
      <Text style={styles.subtitle}>Cuidando tus plantas</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaffea", 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 130,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    marginBottom: 5,
    color: "#007a33",
  },
  subtitle: {
    fontSize: 16,
    color: "#3cb371",
  },
}); 