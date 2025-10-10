import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface RankBadgeProps {
  rank: string;
  size?: "small" | "medium" | "large";
}

const RANK_COLORS: Record<string, string> = {
  BEGINNER: "#9E9E9E",
  NOVICE: "#8BC34A",
  INTERMEDIATE: "#2196F3",
  ADVANCED: "#9C27B0",
  EXPERT: "#FF9800",
  MASTER: "#F44336",
  LEGEND: "#FFD700",
};

const RANK_LABELS: Record<string, string> = {
  BEGINNER: "Principiante",
  NOVICE: "Novato",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
  EXPERT: "Experto",
  MASTER: "Maestro",
  LEGEND: "Leyenda",
};

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = "medium",
}) => {
  const color = RANK_COLORS[rank] || "#9E9E9E";
  const label = RANK_LABELS[rank] || rank;

  const sizeStyles = {
    small: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 10 },
    medium: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 12 },
    large: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 },
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${color}20`,
          borderColor: color,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          paddingVertical: sizeStyles[size].paddingVertical,
        },
      ]}
    >
      <Text
        style={[styles.text, { color, fontSize: sizeStyles[size].fontSize }]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
