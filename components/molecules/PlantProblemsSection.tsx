import { Plant } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PlantProblemsSectionProps {
  plant: Plant;
}

const PlantProblemsSection: React.FC<PlantProblemsSectionProps> = ({
  plant,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Problemas comunes</Text>

      {plant.commonPests.length > 0 || plant.commonDiseases.length > 0 ? (
        <>
          {plant.commonPests.length > 0 && (
            <View style={styles.listContainer}>
              <Text style={styles.subtitle}>Plagas:</Text>
              {plant.commonPests.map((pest, index) => (
                <Text key={`pest-${index}`} style={styles.listItem}>
                  • {pest}
                </Text>
              ))}
            </View>
          )}

          {plant.commonDiseases.length > 0 && (
            <View style={styles.listContainer}>
              <Text style={styles.subtitle}>Enfermedades:</Text>
              {plant.commonDiseases.map((disease, index) => (
                <Text key={`disease-${index}`} style={styles.listItem}>
                  • {disease}
                </Text>
              ))}
            </View>
          )}
        </>
      ) : (
        <Text style={styles.noData}>
          No hay información sobre problemas comunes.
        </Text>
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
    color: "#F44336",
  },
  listContainer: {
    marginBottom: 12,
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

export default PlantProblemsSection;
