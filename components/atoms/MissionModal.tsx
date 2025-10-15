import { Mission } from "@/types/Mission";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DifficultyBadge from "./DifficultyBadge";

interface MissionModalProps {
  visible: boolean;
  mission: Mission | null;
  onClose: () => void;
  onAccept: (mission: Mission) => void;
  isLoading?: boolean;
}

const MissionModal: React.FC<MissionModalProps> = ({
  visible,
  mission,
  onClose,
  onAccept,
  isLoading = false,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (visible) {
      // Reset values before animating
      fadeAnim.setValue(0);
      slideAnim.setValue(300);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  if (!mission) return null;

  const handleAccept = () => {
    onAccept(mission);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="trophy" size={32} color="#FFD700" />
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {mission.title}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.difficultyContainer}>
              <DifficultyBadge difficulty={mission.difficulty} />
            </View>

            <Text style={styles.description}>{mission.description}</Text>

            {/* Requirements */}
            {mission.requirements.targetCount && (
              <View style={styles.requirementCard}>
                <Ionicons name="flag" size={20} color="#1976D2" />
                <Text style={styles.requirementText}>
                  Meta: {mission.requirements.targetCount}
                </Text>
              </View>
            )}

            {/* Rewards */}
            <View style={styles.rewardsContainer}>
              <Text style={styles.rewardsTitle}>Recompensas</Text>
              <View style={styles.rewardsList}>
                <View style={styles.rewardItem}>
                  <Ionicons name="star" size={24} color="#FFD700" />
                  <Text style={styles.rewardValue}>{mission.pointsReward}</Text>
                  <Text style={styles.rewardLabel}>Puntos</Text>
                </View>
                <View style={styles.rewardItem}>
                  <Ionicons name="trending-up" size={24} color="#4CAF50" />
                  <Text style={styles.rewardValue}>
                    {mission.experienceReward}
                  </Text>
                  <Text style={styles.rewardLabel}>Experiencia</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                (!mission.isActive || isLoading) && styles.acceptButtonDisabled,
              ]}
              onPress={handleAccept}
              activeOpacity={0.7}
              disabled={!mission.isActive || isLoading}
            >
              {isLoading ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.acceptButtonText}>Asignando...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  <Text style={styles.acceptButtonText}>Aceptar Misión</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    maxHeight: "70%",
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  difficultyContainer: {
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  requirementCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  requirementText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
  },
  rewardsContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  rewardsList: {
    flexDirection: "row",
    gap: 16,
  },
  rewardItem: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  rewardValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  rewardLabel: {
    fontSize: 12,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  acceptButton: {
    flex: 2,
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  acceptButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default MissionModal;
