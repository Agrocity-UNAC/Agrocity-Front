import { Plant } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PlantCompanionSectionProps {
  plant: Plant;
}

const PlantCompanionSection: React.FC<PlantCompanionSectionProps> = ({
  plant,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Plantas compañeras</Text>

      {plant.companionPlants.length > 0 ? (
        <View style={styles.listContainer}>
          <Text style={styles.subtitle}>Plantas compatibles:</Text>
          {plant.companionPlants.map((companion, index) => (
            <Text key={`companion-${index}`} style={styles.listItem}>
              • {companion}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noData}>
          No hay información sobre plantas compañeras.
        </Text>
      )}

      {plant.incompatiblePlants.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={[styles.subtitle, styles.incompatibleTitle]}>
            Plantas incompatibles:
          </Text>
          {plant.incompatiblePlants.map((incompatible, index) => (
            <Text key={`incompatible-${index}`} style={styles.listItem}>
              • {incompatible}
            </Text>
          ))}
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
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#4CAF50",
  },
  incompatibleTitle: {
    color: "#F44336",
    marginTop: 16,
  },
  listContainer: {
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    marginBottom: 6,
    paddingLeft: 8,
    lineHeight: 20,
  },
  noData: {
    fontStyle: "italic",
    color: "#888",
  },
});

export default PlantCompanionSection;
