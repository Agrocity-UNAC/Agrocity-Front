import { Mission } from "@/types/Mission";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import DifficultyBadge from "./DifficultyBadge";

interface MissionCardProps {
  mission: Mission;
  onPress?: () => void;
  style?: ViewStyle;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onPress,
  style,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#4CAF50";
      case "medium":
        return "#FF9800";
      case "hard":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!mission.isActive}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="trophy" size={24} color="#FFD700" />
          <Text style={styles.title} numberOfLines={1}>
            {mission.title}
          </Text>
        </View>
        <DifficultyBadge difficulty={mission.difficulty} />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {mission.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.rewardContainer}>
          <View style={styles.reward}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rewardText}>{mission.pointsReward} pts</Text>
          </View>
          <View style={styles.reward}>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.rewardText}>
              {mission.experienceReward} exp
            </Text>
          </View>
        </View>

        {mission.requirements.targetCount && (
          <View style={styles.requirementBadge}>
            <Text style={styles.requirementText}>
              Meta: {mission.requirements.targetCount}
            </Text>
          </View>
        )}
      </View>

      {!mission.isActive && (
        <View style={styles.inactiveOverlay}>
          <Text style={styles.inactiveText}>No disponible</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardContainer: {
    flexDirection: "row",
    gap: 12,
  },
  reward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  requirementBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  requirementText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1976D2",
  },
  inactiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MissionCard;
