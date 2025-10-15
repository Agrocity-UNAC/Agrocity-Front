import AddUserPlantForm from "@/components/organisms/AddUserPlantForm";
import { useCreateUserPlant } from "@/hooks/useCreateUserPlant";
import { usePlants } from "@/hooks/usePlants";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddUserPlantPage = () => {
  const { plants, isLoading: isLoadingPlants } = usePlants();
  const { addUserPlant, isCreating } = useCreateUserPlant();
  const router = useRouter();

  const handleSubmit = async (
    plantId: string,
    nickname: string,
    imageUris: string[]
  ) => {
    const result = await addUserPlant({ plantId, nickname, imageUris });

    if (result.success) {
      // Navegar de vuelta a la lista de plantas
      router.push("/myPlants");
    } else {
      // Lanzar el error para debugging
      throw new Error(result.error || "Error al crear la planta");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AddUserPlantForm
        plants={plants}
        isLoadingPlants={isLoadingPlants}
        isCreating={isCreating}
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
});

export default AddUserPlantPage;
