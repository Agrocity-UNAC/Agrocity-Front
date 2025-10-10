import { BasePlant } from "@/types/Plant";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DifficultyBadge from "../atoms/DifficultyBadge";
import PlantImage from "../atoms/PlantImage";
import PlantTypeTag from "../atoms/PlantTypeTag";

interface PlantSelectorCardProps {
  plant: BasePlant;
  isSelected: boolean;
  onPress: () => void;
}

const PlantSelectorCard: React.FC<PlantSelectorCardProps> = ({
  plant,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <PlantImage imageUrl={plant.image} size="small" />
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.commonName} numberOfLines={1}>
          {plant.commonName}
        </Text>
        {plant.scientificName && (
          <Text style={styles.scientificName} numberOfLines={1}>
            {plant.scientificName}
          </Text>
        )}
        <View style={styles.tagsContainer}>
          <PlantTypeTag type={plant.plantType} />
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
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  selected: {
    borderColor: "#4CAF50",
    backgroundColor: "#F1F8F4",
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    position: "relative",
  },
  checkmark: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  scientificName: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
});

export default PlantSelectorCard;
