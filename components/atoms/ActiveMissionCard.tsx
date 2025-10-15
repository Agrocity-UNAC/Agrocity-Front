import { UserMission } from "@/types/UserMission";
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
import { ProgressBar } from "./ProgressBar";

interface ActiveMissionCardProps {
  userMission: UserMission;
  onPress?: () => void;
  onAbandon?: (userMission: UserMission) => void;
  style?: ViewStyle;
}

const ActiveMissionCard: React.FC<ActiveMissionCardProps> = ({
  userMission,
  onPress,
  onAbandon,
  style,
}) => {
  const { mission, progress, completed } = userMission;

  const handleAbandonPress = (e: any) => {
    e.stopPropagation();
    onAbandon?.(userMission);
  };

  return (
    <TouchableOpacity
      style={[styles.card, completed && styles.cardCompleted, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name={completed ? "checkmark-circle" : "trophy"}
            size={24}
            color={completed ? "#4CAF50" : "#FFD700"}
          />
          <Text style={styles.title} numberOfLines={1}>
            {mission.title}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <DifficultyBadge difficulty={mission.difficulty} />
          {!completed && onAbandon && (
            <TouchableOpacity
              onPress={handleAbandonPress}
              style={styles.abandonButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={24} color="#FF5252" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {mission.description}
      </Text>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressText}>
            {progress} / {mission.requirements.targetCount || 0}
          </Text>
        </View>
        <ProgressBar
          current={progress}
          total={mission.requirements.targetCount || 1}
          showPercentage={false}
          height={8}
        />
      </View>

      {/* Rewards */}
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

        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>¡Completada!</Text>
          </View>
        )}
      </View>
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
  cardCompleted: {
    backgroundColor: "#F1F8F4",
    borderWidth: 2,
    borderColor: "#4CAF50",
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  abandonButton: {
    padding: 4,
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
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
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
  completedBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ActiveMissionCard;
