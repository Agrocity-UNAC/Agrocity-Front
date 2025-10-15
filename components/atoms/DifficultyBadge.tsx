import { Difficulty } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return "#4CAF50"; // Green
      case Difficulty.MEDIUM:
        return "#FFC107"; // Amber
      case Difficulty.HARD:
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Gray
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return "Fácil";
      case Difficulty.MEDIUM:
        return "Moderada";
      case Difficulty.HARD:
        return "Difícil";
      default:
        return "Desconocida";
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getDifficultyColor() }]}>
      <Text style={styles.text}>{getDifficultyText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DifficultyBadge;
