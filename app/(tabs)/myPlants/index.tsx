import FloatingActionButton from "@/components/atoms/FloatingActionButton";
import UserPlantsList from "@/components/organisms/UserPlantsList";
import { useUserPlants } from "@/hooks/useUserPlants";
import { UserPlant } from "@/types/UserPlant";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyPlantsIndex = () => {
  const { userPlants, isLoading, refreshUserPlants } = useUserPlants();
  const router = useRouter();

  const handlePlantPress = (userPlant: UserPlant) => {
    router.push(`/myPlants/${userPlant._id}`);
  };

  const handleAddPlant = () => {
    router.push("/myPlants/add");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <UserPlantsList
        userPlants={userPlants}
        isLoading={isLoading}
        onRefresh={refreshUserPlants}
        onPlantPress={handlePlantPress}
      />

      <FloatingActionButton onPress={handleAddPlant} icon="+" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});

export default MyPlantsIndex;
