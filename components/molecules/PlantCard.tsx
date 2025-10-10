import { BasePlant } from "@/types/Plant";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DifficultyBadge from "../atoms/DifficultyBadge";
import PlantImage from "../atoms/PlantImage";

interface PlantCardProps {
  plant: BasePlant;
  onPress?: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <PlantImage imageUrl={plant.image} size="medium" />
      <View style={styles.content}>
        <Text style={styles.commonName}>{plant.commonName}</Text>
        {plant.scientificName && (
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
        )}
        <View style={styles.badgeContainer}>
          <DifficultyBadge difficulty={plant.difficulty} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: "#F5F5F5",
  },
  content: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 18,
    fontWeight: "600",
  },
  scientificName: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
  },
  badgeContainer: {
    marginTop: 6,
  },
});

export default PlantCard;
