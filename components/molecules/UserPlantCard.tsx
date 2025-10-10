import { UserPlant } from "@/types/UserPlant";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DifficultyBadge from "../atoms/DifficultyBadge";
import PlantImage from "../atoms/PlantImage";
import PlantTypeTag from "../atoms/PlantTypeTag";

interface UserPlantCardProps {
  userPlant: UserPlant;
  onPress?: () => void;
}

const UserPlantCard: React.FC<UserPlantCardProps> = ({
  userPlant,
  onPress,
}) => {
  const { plant, nickname, careProgress, createdAt } = userPlant;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.imageSection}>
        <PlantImage imageUrl={plant.image} size="medium" />
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${careProgress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{careProgress}%</Text>
        </View>
        <Text style={styles.addedDate}>Añadida: {formatDate(createdAt)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text style={styles.commonName}>{plant.commonName}</Text>
        {plant.scientificName && (
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
        )}
        <View style={styles.metaContainer}>
          <PlantTypeTag type={plant.plantType} />
          <DifficultyBadge difficulty={plant.difficulty} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: "#F5F5F5",
  },
  imageSection: {
    alignItems: "center",
    paddingRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },
  commonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  scientificName: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  progressContainer: {
    marginTop: 8,
    width: 100,
    alignItems: "center",
  },
  progressBar: {
    height: 6,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: "#4CAF50",
    fontWeight: "600",
  },
  addedDate: {
    fontSize: 10,
    color: "#999",
    marginTop: 6,
    textAlign: "center",
  },
});

export default UserPlantCard;
