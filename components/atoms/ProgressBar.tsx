import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  color = "#4CAF50",
  showPercentage = true,
  height = 8,
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
      {!label && showPercentage && (
        <Text style={styles.stats}>
          {current} / {total}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  percentage: {
    fontSize: 14,
    color: "#333",
    fontWeight: "700",
  },
  track: {
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 100,
  },
  stats: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    textAlign: "right",
  },
});
