import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../atoms/ProgressBar";
import { RankBadge } from "../atoms/RankBadge";

interface LevelProgressCardProps {
  level: number;
  experience: number;
  rank: string;
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  level,
  experience,
  rank,
}) => {
  // Cálculo simple: cada nivel requiere level * 100 XP
  const xpForNextLevel = level * 100;
  const currentLevelXP = experience % xpForNextLevel;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nivel {level}</Text>
          <Text style={styles.subtitle}>
            {currentLevelXP} / {xpForNextLevel} XP
          </Text>
        </View>
        <RankBadge rank={rank} size="large" />
      </View>

      <ProgressBar
        current={currentLevelXP}
        total={xpForNextLevel}
        color="#4CAF50"
        showPercentage={false}
        height={12}
      />

      <Text style={styles.nextLevel}>
        {xpForNextLevel - currentLevelXP} XP para nivel {level + 1}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  nextLevel: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});
