import { Plant } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DifficultyBadge from "../atoms/DifficultyBadge";
import PlantImage from "../atoms/PlantImage";
import PlantTypeTag from "../atoms/PlantTypeTag";

interface PlantHeaderProps {
  plant: Plant;
}

const PlantHeader: React.FC<PlantHeaderProps> = ({ plant }) => {
  return (
    <View style={styles.container}>
      <PlantImage imageUrl={plant.image} size="large" />

      <View style={styles.infoContainer}>
        <Text style={styles.commonName}>{plant.commonName}</Text>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>

        <View style={styles.tagsContainer}>
          <PlantTypeTag type={plant.plantType} />
          <View style={styles.tagSpacer} />
          <DifficultyBadge difficulty={plant.difficulty} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tagSpacer: {
    width: 8,
  },
});

export default PlantHeader;
