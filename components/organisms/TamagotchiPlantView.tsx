import { SensorReading, UserPlant } from "@/types/UserPlant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PlantCareActions } from "../molecules/PlantCareActions";
import { PlantStatsRow } from "../molecules/PlantStatsRow";
import { PlantStatusCard } from "../molecules/PlantStatusCard";
import { SensorGrid } from "../molecules/SensorGrid";

interface TamagotchiPlantViewProps {
  userPlant: UserPlant;
  sensorReading: SensorReading | null;
  isConnected: boolean;
  onWater: () => void;
  onFertilize: () => void;
  isWatering: boolean;
  isFertilizing: boolean;
}

export const TamagotchiPlantView: React.FC<TamagotchiPlantViewProps> = ({
  userPlant,
  sensorReading,
  isConnected,
  onWater,
  onFertilize,
  isWatering,
  isFertilizing,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Connection Status */}
      <View style={styles.connectionBadge}>
        <View
          style={[
            styles.connectionDot,
            { backgroundColor: isConnected ? "#4CAF50" : "#9E9E9E" },
          ]}
        />
        <Text style={styles.connectionText}>
          {isConnected ? "En vivo" : "Desconectado"}
        </Text>
      </View>

      {/* Plant Status Card - Tamagotchi style */}
      <PlantStatusCard
        nickname={userPlant.nickname}
        commonName={userPlant.plant.commonName}
        emotionalState={userPlant.emotionalState}
        health={userPlant.health}
        daysAlive={userPlant.daysAlive}
        plantImageUrl={userPlant.plant.image}
        userImages={userPlant.images}
      />

      {/* Stats Row */}
      <PlantStatsRow
        wateringScore={userPlant.wateringScore}
        perfectCareDays={userPlant.perfectCareDays}
        careProgress={userPlant.careProgress}
      />

      {/* Care Actions - Water and Fertilize */}
      <PlantCareActions
        onWater={onWater}
        onFertilize={onFertilize}
        isWatering={isWatering}
        isFertilizing={isFertilizing}
      />

      {/* Sensor Grid */}
      <SensorGrid sensorReading={sensorReading} />

      {/* Achievements */}
      {userPlant.achievements.length > 0 && (
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trophy" size={20} color="#FFD700" />
            <Text style={styles.sectionTitle}>Logros Desbloqueados</Text>
          </View>
          <View style={styles.achievementsList}>
            {userPlant.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Last Care Info */}
      <View style={styles.careInfoSection}>
        <View style={styles.careInfoRow}>
          <Ionicons name="water-outline" size={18} color="#2196F3" />
          <Text style={styles.careInfoLabel}>Último riego:</Text>
          <Text style={styles.careInfoValue}>
            {userPlant.lastWatered
              ? new Date(userPlant.lastWatered).toLocaleDateString("es-ES")
              : "Sin datos"}
          </Text>
        </View>
        <View style={styles.careInfoRow}>
          <Ionicons name="nutrition-outline" size={18} color="#8BC34A" />
          <Text style={styles.careInfoLabel}>Último fertilizado:</Text>
          <Text style={styles.careInfoValue}>
            {userPlant.lastFertilized
              ? new Date(userPlant.lastFertilized).toLocaleDateString("es-ES")
              : "Sin datos"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  connectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  connectionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  achievementsSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  achievementsList: {
    gap: 8,
  },
  achievementBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F9F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "500",
  },
  careInfoSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  careInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  careInfoLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  careInfoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
