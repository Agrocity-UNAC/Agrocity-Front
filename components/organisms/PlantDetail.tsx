import { Plant } from "@/types/Plant";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PlantCharacteristics from "../molecules/PlantCharacteristics";
import PlantCompanionSection from "../molecules/PlantCompanionSection";
import PlantCultivation from "../molecules/PlantCultivation";
import PlantHarvestSection from "../molecules/PlantHarvestSection";
import PlantHeader from "../molecules/PlantHeader";
import PlantProblemsSection from "../molecules/PlantProblemsSection";

interface PlantDetailProps {
  plant: Plant;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <PlantHeader plant={plant} />

      {plant.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{plant.description}</Text>
        </View>
      )}

      <PlantCharacteristics plant={plant} />
      <PlantCultivation plant={plant} />

      {plant.growingTips.length > 0 && (
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Consejos de cultivo</Text>
          {plant.growingTips.map((tip, index) => (
            <Text key={`tip-${index}`} style={styles.tipItem}>
              • {tip}
            </Text>
          ))}
        </View>
      )}

      <PlantCompanionSection plant={plant} />
      <PlantProblemsSection plant={plant} />
      <PlantHarvestSection plant={plant} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  descriptionContainer: {
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  tipsContainer: {
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
  tipItem: {
    fontSize: 15,
    marginBottom: 10,
    paddingLeft: 8,
    lineHeight: 22,
  },
});

export default PlantDetail;
