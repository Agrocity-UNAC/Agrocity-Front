import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SensorBadgeProps {
  type: string;
  value: number;
  unit?: string;
}

export const SensorBadge: React.FC<SensorBadgeProps> = ({
  type,
  value,
  unit,
}) => {
  const getSensorConfig = () => {
    switch (type) {
      case "TEMPERATURE":
        return {
          icon: "thermometer-outline" as const,
          color: "#FF5722",
          label: "Temperatura",
          unit: "°C",
        };
      case "SOIL_HUMIDITY":
        return {
          icon: "water-outline" as const,
          color: "#2196F3",
          label: "H. Suelo",
          unit: "%",
        };
      case "AMBIENT_HUMIDITY":
        return {
          icon: "rainy-outline" as const,
          color: "#00BCD4",
          label: "H. Ambiente",
          unit: "%",
        };
      case "LIGHT":
        return {
          icon: "sunny-outline" as const,
          color: "#FFC107",
          label: "Luz",
          unit: " lux",
        };
      default:
        return {
          icon: "stats-chart-outline" as const,
          color: "#666",
          label: type,
          unit: "",
        };
    }
  };

  const config = getSensorConfig();

  return (
    <View style={[styles.container, { backgroundColor: `${config.color}15` }]}>
      <Ionicons name={config.icon} size={20} color={config.color} />
      <View style={styles.content}>
        <Text style={styles.label}>{config.label}</Text>
        <Text style={[styles.value, { color: config.color }]}>
          {value.toFixed(1)}
          {unit || config.unit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 110,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
  },
});
