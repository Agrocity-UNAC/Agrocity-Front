import EditUserPlantForm from "@/components/organisms/EditUserPlantForm";
import { useUpdateUserPlant } from "@/hooks/useUpdateUserPlant";
import { useUserPlantsStore } from "@/stores/plants/userPlantsStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditUserPlantPage = () => {
  const { userPlantId } = useLocalSearchParams<{ userPlantId: string }>();
  const router = useRouter();

  const { userPlants } = useUserPlantsStore();
  const { updateUserPlant, isUpdating } = useUpdateUserPlant();

  const userPlant = userPlants.find((plant) => plant._id === userPlantId);

  const handleSubmit = async (nickname: string, imageUris: string[]) => {
    if (!userPlantId) return;

    const result = await updateUserPlant(userPlantId, {
      nickname,
      imageUris: imageUris.length > 0 ? imageUris : undefined,
    });

    if (result.success) {
      Alert.alert("¡Éxito!", "Tu planta ha sido actualizada correctamente", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } else {
      Alert.alert("Error", result.error || "No se pudo actualizar la planta");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!userPlant) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontró la planta</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Planta</Text>
        <Text style={styles.subtitle}>{userPlant.plant.commonName}</Text>
      </View>
      <EditUserPlantForm
        userPlant={userPlant}
        isUpdating={isUpdating}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
  },
});

export default EditUserPlantPage;
