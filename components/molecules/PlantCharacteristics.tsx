import { Lifespan, Plant, SunlightNeed, WaterNeed } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoLabel from "../atoms/InfoLabel";

interface PlantCharacteristicsProps {
  plant: Plant;
}

const PlantCharacteristics: React.FC<PlantCharacteristicsProps> = ({
  plant,
}) => {
  const getSunlightText = (sunlight: SunlightNeed) => {
    switch (sunlight) {
      case SunlightNeed.FULL_SUN:
        return "Sol pleno";
      case SunlightNeed.PARTIAL_SUN:
        return "Sol parcial";
      case SunlightNeed.PARTIAL_SHADE:
        return "Sombra parcial";
      case SunlightNeed.FULL_SHADE:
        return "Sombra total";
      default:
        return "Desconocido";
    }
  };

  const getWaterNeedText = (waterNeed: WaterNeed) => {
    switch (waterNeed) {
      case WaterNeed.LOW:
        return "Bajo";
      case WaterNeed.MODERATE:
        return "Moderado";
      case WaterNeed.HIGH:
        return "Alto";
      default:
        return "Desconocido";
    }
  };

  const getLifespanText = (lifespan: Lifespan) => {
    switch (lifespan) {
      case Lifespan.ANNUAL:
        return "Anual";
      case Lifespan.BIENNIAL:
        return "Bienal";
      case Lifespan.PERENNIAL:
        return "Perenne";
      default:
        return "Desconocido";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Características</Text>

      <InfoLabel label="Familia" value={plant.family} />
      <InfoLabel label="Variedad" value={plant.variety} />
      <InfoLabel
        label="Ciclo de vida"
        value={getLifespanText(plant.lifespan)}
      />
      <InfoLabel label="Altura máxima" value={`${plant.maxHeight} cm`} />
      <InfoLabel
        label="Necesidad de luz"
        value={getSunlightText(plant.sunlight)}
      />
      <InfoLabel
        label="Necesidad de agua"
        value={getWaterNeedText(plant.waterNeed)}
      />
      <InfoLabel label="Tipo de suelo" value={plant.soilType.join(", ")} />
      <InfoLabel label="Rango de pH" value={plant.phRange} />
      <InfoLabel label="Temperatura mínima" value={`${plant.minTemp}°C`} />
      <InfoLabel label="Temperatura máxima" value={`${plant.maxTemp}°C`} />
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

export default PlantCharacteristics;
