import { Plant } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoLabel from "../atoms/InfoLabel";

interface PlantCultivationProps {
  plant: Plant;
}

const PlantCultivation: React.FC<PlantCultivationProps> = ({ plant }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cultivo</Text>

      <InfoLabel
        label="Distancia entre plantas"
        value={`${plant.plantDistance} cm`}
      />
      <InfoLabel
        label="Distancia entre filas"
        value={`${plant.rowDistance} cm`}
      />
      <InfoLabel label="Profundidad de siembra" value={`${plant.depth} cm`} />
      <InfoLabel label="Días para germinar" value={plant.daysToGerminate} />
      <InfoLabel label="Días hasta madurez" value={plant.daysToMaturity} />
      <InfoLabel
        label="Frecuencia de riego"
        value={`Cada ${plant.wateringFrequency} días`}
      />
      <InfoLabel
        label="Cantidad de agua"
        value={`${plant.wateringAmount} ml por riego`}
      />
      <InfoLabel
        label="Frecuencia de fertilización"
        value={`Cada ${plant.fertilizingFrequency} días`}
      />
      <InfoLabel
        label="Requiere poda"
        value={plant.prunningRequired ? "Sí" : "No"}
      />
      <InfoLabel
        label="Meses de siembra"
        value={plant.plantingMonths.join(", ")}
      />
      <InfoLabel
        label="Meses de cosecha"
        value={plant.harvestMonths.join(", ")}
      />
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
});

export default PlantCultivation;
