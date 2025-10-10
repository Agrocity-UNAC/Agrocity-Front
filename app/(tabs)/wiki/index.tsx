import PlantsList from "@/components/organisms/PlantsList";
import { usePlants } from "@/hooks/usePlants";
import { BasePlant } from "@/types/Plant";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WikiIndex = () => {
  const { plants, isLoading, refreshPlants } = usePlants();
  const router = useRouter();

  const handlePlantPress = (plant: BasePlant) => {
    router.push(`/wiki/${plant._id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wiki de Plantas</Text>

      {isLoading && plants.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <PlantsList
          plants={plants}
          isLoading={isLoading}
          onRefresh={refreshPlants}
          onPlantPress={handlePlantPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WikiIndex;
