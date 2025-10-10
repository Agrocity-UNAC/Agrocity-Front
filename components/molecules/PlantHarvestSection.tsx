import { Plant } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoLabel from "../atoms/InfoLabel";

interface PlantHarvestSectionProps {
  plant: Plant;
}

const PlantHarvestSection: React.FC<PlantHarvestSectionProps> = ({ plant }) => {
  if (!plant.harvestable) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Información de cosecha</Text>

      <InfoLabel label="Tamaño de cosecha" value={plant.harvestSize} />
      <InfoLabel
        label="Partes comestibles"
        value={plant.edibleParts.join(", ")}
      />
      <InfoLabel label="Método de almacenamiento" value={plant.storageMethod} />
      <InfoLabel
        label="Tiempo de conservación"
        value={`${plant.shelfLife} días`}
      />

      {plant.nutritionalInfo && (
        <View style={styles.nutritionContainer}>
          <Text style={styles.subtitle}>Información nutricional:</Text>
          <Text style={styles.nutritionText}>{plant.nutritionalInfo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  nutritionContainer: {
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  nutritionText: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default PlantHarvestSection;
