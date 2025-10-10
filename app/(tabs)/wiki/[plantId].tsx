import PlantDetail from "@/components/organisms/PlantDetail";
import { usePlant } from "@/hooks/usePlant";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlantDetailScreen = () => {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const router = useRouter();
  const { plant, isLoading, refreshPlant } = usePlant(plantId || "");

  if (isLoading && !plant) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>
          Cargando información de la planta...
        </Text>
      </SafeAreaView>
    );
  }

  if (!plant && !isLoading) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>¡Ups! Algo salió mal</Text>
        <Text style={styles.errorText}>
          No pudimos encontrar la información de esta planta.
        </Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={() => router.back()}>
            Volver atrás
          </Text>
          <Text style={styles.button} onPress={refreshPlant}>
            Intentar de nuevo
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {plant && <PlantDetail plant={plant} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#D32F2F",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    padding: 12,
  },
});

export default PlantDetailScreen;
