import React from "react";
import { StyleSheet, View } from "react-native";
import { StatCard } from "../atoms/StatCard";

interface UserStatsGridProps {
  level: number;
  currentPoints: number;
  currentStreak: number;
  longestStreak: number;
}

export const UserStatsGrid: React.FC<UserStatsGridProps> = ({
  level,
  currentPoints,
  currentStreak,
  longestStreak,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatCard
          icon="trophy"
          label="Nivel"
          value={level}
          color="#FFD700"
          backgroundColor="#FFF9E6"
        />
        <StatCard
          icon="star"
          label="Puntos"
          value={currentPoints}
          color="#FF9800"
          backgroundColor="#FFF3E0"
        />
      </View>
      <View style={styles.row}>
        <StatCard
          icon="flame"
          label="Racha Actual"
          value={`${currentStreak}d`}
          color="#F44336"
          backgroundColor="#FFEBEE"
        />
        <StatCard
          icon="ribbon"
          label="Mejor Racha"
          value={`${longestStreak}d`}
          color="#9C27B0"
          backgroundColor="#F3E5F5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
