import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const { isAuthenticated, isLoadingAuth, initializeAuth } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      initializeAuth();
      
      // Animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, []);

  // Mostrar pantalla de carga mientras se inicializa la autenticación
  if (isLoadingAuth) {
    return (
      <View style={styles.container}>
        {/* Fondo con gradiente */}
        <View style={styles.gradientTop} />
        <View style={styles.gradientBottom} />
        
        {/* Nubes decorativas */}
        <View style={styles.cloud1} />
        <View style={styles.cloud2} />
        <View style={styles.cloud3} />
        <View style={styles.cloud4} />
        
        {/* Sol */}
        <View style={styles.sun} />

        {/* Contenido central */}
        <View style={styles.contentContainer}>
          <Animated.View 
            style={[
              styles.logoContainer,
              { 
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="leaf" style={styles.leafIcon} />
            </View>
          </Animated.View>

          <Animated.Text 
            style={[
              styles.appName,
              { opacity: fadeAnim }
            ]}
          >
            Agrocity
          </Animated.Text>
          
          <Animated.Text 
            style={[
              styles.tagline,
              { opacity: fadeAnim }
            ]}
          >
            Cuidando tus plantas
          </Animated.Text>

          <Animated.View 
            style={[
              styles.loadingIndicator,
              { opacity: fadeAnim }
            ]}
          >
            <ActivityIndicator size="large" color="#4CAF50" />
          </Animated.View>
        </View>
      </View>
    );
  }

  // Una vez que la autenticación se ha inicializado, mostrar el Stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="inicio/login" />
      <Stack.Screen name="inicio/register" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "70%",
    backgroundColor: "#87CEEB", // Azul cielo
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "#90EE90", // Verde claro
  },
  cloud1: {
    position: "absolute",
    top: 80,
    left: 30,
    width: 70,
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 35,
  },
  cloud2: {
    position: "absolute",
    top: 120,
    right: 40,
    width: 90,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 45,
  },
  cloud3: {
    position: "absolute",
    top: 60,
    right: 120,
    width: 60,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 30,
  },
  cloud4: {
    position: "absolute",
    top: 100,
    left: 100,
    width: 50,
    height: 25,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
  },
  sun: {
    position: "absolute",
    top: 50,
    right: 50,
    width: 45,
    height: 45,
    backgroundColor: "#FFD700",
    borderRadius: 22.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  leafIcon: {
    fontSize: 60,
    color: "#fff",
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 20,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "500",
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
