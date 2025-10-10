import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PlantStatsRowProps {
  wateringScore: number;
  perfectCareDays: number;
  careProgress: number;
}

export const PlantStatsRow: React.FC<PlantStatsRowProps> = ({
  wateringScore,
  perfectCareDays,
  careProgress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Ionicons name="water" size={24} color="#2196F3" />
        <Text style={styles.statValue}>{wateringScore}</Text>
        <Text style={styles.statLabel}>Riego</Text>
      </View>

      <View style={styles.statCard}>
        <Ionicons name="star" size={24} color="#FFD700" />
        <Text style={styles.statValue}>{perfectCareDays}</Text>
        <Text style={styles.statLabel}>Días perfectos</Text>
      </View>

      <View style={styles.statCard}>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        <Text style={styles.statValue}>{careProgress}%</Text>
        <Text style={styles.statLabel}>Progreso</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
