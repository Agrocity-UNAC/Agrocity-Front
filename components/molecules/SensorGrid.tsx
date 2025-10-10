import { SensorReading } from "@/types/UserPlant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SensorBadge } from "../atoms/SensorBadge";

interface SensorGridProps {
  sensorReading: SensorReading | null;
}

export const SensorGrid: React.FC<SensorGridProps> = ({ sensorReading }) => {
  if (!sensorReading) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="radio-outline" size={48} color="#999" />
        <Text style={styles.emptyText}>Esperando lecturas de sensores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="hardware-chip-outline" size={20} color="#4CAF50" />
        <Text style={styles.title}>Sensores en Tiempo Real</Text>
      </View>

      <View style={styles.grid}>
        <SensorBadge type="TEMPERATURE" value={sensorReading.TEMPERATURE} />
        <SensorBadge
          type="AMBIENT_HUMIDITY"
          value={sensorReading.AMBIENT_HUMIDITY}
        />
        <SensorBadge type="SOIL_HUMIDITY" value={sensorReading.SOIL_HUMIDITY} />
        <SensorBadge type="LIGHT" value={sensorReading.LIGHT} />
      </View>

      <Text style={styles.timestamp}>
        Última actualización:{" "}
        {new Date(sensorReading.createdAt).toLocaleTimeString("es-ES")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 12,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
    textAlign: "center",
  },
});
