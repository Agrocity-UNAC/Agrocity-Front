import FloatingActionButton from "@/components/atoms/FloatingActionButton";
import MissionsButton from "@/components/atoms/MissionsButton";
import UserPlantsList from "@/components/organisms/UserPlantsList";
import { useUserPlants } from "@/hooks/useUserPlants";
import { UserPlant } from "@/types/UserPlant";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
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

  const handleMissionsPress = () => {
    router.push("/myPlants/missions");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <MissionsButton onPress={handleMissionsPress} />
      </View>

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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-end",
  },
});

export default MyPlantsIndex;
