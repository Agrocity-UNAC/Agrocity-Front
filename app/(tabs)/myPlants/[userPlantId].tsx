import FloatingActionButton from "@/components/atoms/FloatingActionButton";
import { TamagotchiPlantView } from "@/components/organisms/TamagotchiPlantView";
import { useMqttPlantStore } from "@/stores/plants/MqttPlantStore";
import { useUserPlantsStore } from "@/stores/plants/userPlantsStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserPlantDetail = () => {
  const { userPlantId } = useLocalSearchParams<{ userPlantId: string }>();
  const router = useRouter();

  const {
    isSubscribed,
    isConnecting,
    latestSensorReading,
    error,
    subscribeToPlantUpdates,
    unsubscribeFromPlantUpdates,
  } = useMqttPlantStore();

  const { userPlants, waterPlant, fertilizePlant, isWatering, isFertilizing } =
    useUserPlantsStore();

  // Find the specific user plant
  const userPlant = userPlants.find((plant) => plant._id === userPlantId);

  const handleWater = async () => {
    if (!userPlantId) return;

    try {
      await waterPlant(userPlantId);
      Alert.alert("¡Éxito!", "Has regado tu planta correctamente 💧");
    } catch {
      Alert.alert("Error", "No se pudo regar la planta. Inténtalo de nuevo.");
    }
  };

  const handleFertilize = async () => {
    if (!userPlantId) return;

    try {
      await fertilizePlant(userPlantId);
      Alert.alert("¡Éxito!", "Has fertilizado tu planta correctamente 🌱");
    } catch {
      Alert.alert(
        "Error",
        "No se pudo fertilizar la planta. Inténtalo de nuevo."
      );
    }
  };

  const handleEdit = () => {
    if (!userPlantId) return;
    router.push(`/myPlants/edit/${userPlantId}`);
  };

  useEffect(() => {
    if (!userPlantId) {
      router.back();
      return;
    }

    subscribeToPlantUpdates(userPlantId);

    return () => {
      unsubscribeFromPlantUpdates();
    };
  }, [
    router,
    subscribeToPlantUpdates,
    unsubscribeFromPlantUpdates,
    userPlantId,
  ]);

  if (isConnecting) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Conectando con tu planta...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!userPlant) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No se encontró la planta</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TamagotchiPlantView
        userPlant={userPlant}
        sensorReading={latestSensorReading}
        isConnected={isSubscribed}
        onWater={handleWater}
        onFertilize={handleFertilize}
        isWatering={isWatering}
        isFertilizing={isFertilizing}
      />
      <FloatingActionButton onPress={handleEdit} iconName="create-outline" />
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
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
  },
});

export default UserPlantDetail;
