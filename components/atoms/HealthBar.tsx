import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HealthBarProps {
  health: number;
  label?: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  health,
  label = "Salud",
}) => {
  const getHealthColor = () => {
    if (health >= 80) return "#4CAF50";
    if (health >= 50) return "#FF9800";
    return "#F44336";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color: getHealthColor() }]}>
          {health}%
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${health}%`,
              backgroundColor: getHealthColor(),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
  },
  track: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 6,
  },
});
