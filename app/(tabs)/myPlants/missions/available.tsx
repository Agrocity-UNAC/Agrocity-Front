import MissionModal from "@/components/atoms/MissionModal";
import MissionsList from "@/components/organisms/MissionsList";
import { useAssignMission } from "@/hooks/useAssignMission";
import { useAvailableMissions } from "@/hooks/useAvailableMissions";
import { Mission } from "@/types/Mission";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AvailableMissionsScreen = () => {
  const router = useRouter();
  const { missions, isLoading, error, refreshMissions } =
    useAvailableMissions();
  const { assignMission, isLoading: isAssigning } = useAssignMission();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMissionPress = (mission: Mission) => {
    setSelectedMission(mission);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMission(null);
  };

  const handleAcceptMission = async (mission: Mission) => {
    try {
      const result = await assignMission(mission._id);

      if (result.success) {
        Alert.alert(
          "¡Misión Aceptada!",
          `Has aceptado la misión: ${mission.title}`,
          [
            {
              text: "OK",
              onPress: () => {
                handleCloseModal();
                refreshMissions();
                router.back();
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", result.error || "No se pudo asignar la misión", [
          { text: "OK" },
        ]);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo asignar la misión", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="list" size={28} color="#4CAF50" />
          </View>
          <View>
            <Text style={styles.title}>Misiones Disponibles</Text>
            <Text style={styles.subtitle}>Acepta nuevas misiones</Text>
          </View>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <MissionsList
        missions={missions}
        isLoading={isLoading}
        onRefresh={refreshMissions}
        onMissionPress={handleMissionPress}
      />

      <MissionModal
        visible={modalVisible}
        mission={selectedMission}
        onClose={handleCloseModal}
        onAccept={handleAcceptMission}
        isLoading={isAssigning}
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
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
  },
});

export default AvailableMissionsScreen;
