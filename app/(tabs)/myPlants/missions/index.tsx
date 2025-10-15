import AbandonMissionModal from "@/components/atoms/AbandonMissionModal";
import FloatingActionButton from "@/components/atoms/FloatingActionButton";
import ActiveMissionsList from "@/components/organisms/ActiveMissionsList";
import { useAbandonMission } from "@/hooks/useAbandonMission";
import { useActiveMissions } from "@/hooks/useActiveMissions";
import { useActiveMissionsStore } from "@/stores/missions/activeMissionsStore";
import { UserMission } from "@/types/UserMission";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MissionsIndex = () => {
  const router = useRouter();
  const { userMissions, isLoading, error, refreshActiveMissions } =
    useActiveMissions();
  const fetchActiveMissions = useActiveMissionsStore(
    (state) => state.fetchActiveMissions
  );
  const { abandonMission, isLoading: isAbandoning } = useAbandonMission();
  const [selectedMission, setSelectedMission] = useState<UserMission | null>(
    null
  );
  const [abandonModalVisible, setAbandonModalVisible] = useState(false);

  // Recargar misiones cuando la pantalla esté en foco
  useFocusEffect(
    useCallback(() => {
      fetchActiveMissions();
    }, [fetchActiveMissions])
  );

  const handleMissionPress = (userMission: UserMission) => {
    // Aquí puedes navegar a los detalles de la misión si quieres
    console.log("Mission pressed:", userMission);
  };

  const handleAvailableMissionsPress = () => {
    router.push("/myPlants/missions/available");
  };

  const handleAbandonPress = (userMission: UserMission) => {
    setSelectedMission(userMission);
    setAbandonModalVisible(true);
  };

  const handleCloseAbandonModal = () => {
    setAbandonModalVisible(false);
    setSelectedMission(null);
  };

  const handleConfirmAbandon = async (userMission: UserMission) => {
    try {
      const result = await abandonMission(userMission._id);

      if (result.success) {
        Alert.alert(
          "Misión Abandonada",
          `Has abandonado la misión: ${userMission.mission.title}`,
          [
            {
              text: "OK",
              onPress: () => {
                handleCloseAbandonModal();
                refreshActiveMissions();
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", result.error || "No se pudo abandonar la misión", [
          { text: "OK" },
        ]);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo abandonar la misión", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="trophy" size={32} color="#FFD700" />
          </View>
          <View>
            <Text style={styles.title}>Mis Misiones</Text>
            <Text style={styles.subtitle}>
              Completa misiones para ganar puntos y experiencia
            </Text>
          </View>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ActiveMissionsList
        userMissions={userMissions}
        isLoading={isLoading}
        onRefresh={refreshActiveMissions}
        onMissionPress={handleMissionPress}
        onAbandonMission={handleAbandonPress}
      />

      <FloatingActionButton onPress={handleAvailableMissionsPress} icon="+" />

      <AbandonMissionModal
        visible={abandonModalVisible}
        userMission={selectedMission}
        onClose={handleCloseAbandonModal}
        onConfirm={handleConfirmAbandon}
        isLoading={isAbandoning}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
  },
});

export default MissionsIndex;
