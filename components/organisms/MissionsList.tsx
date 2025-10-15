import { Mission } from "@/types/Mission";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MissionCard from "../atoms/MissionCard";

interface MissionsListProps {
  missions: Mission[];
  isLoading: boolean;
  onRefresh: () => void;
  onMissionPress?: (mission: Mission) => void;
}

const MissionsList: React.FC<MissionsListProps> = ({
  missions,
  isLoading,
  onRefresh,
  onMissionPress,
}) => {
  if (isLoading && missions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando misiones...</Text>
      </View>
    );
  }

  if (!isLoading && missions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay misiones disponibles</Text>
        <Text style={styles.emptySubtext}>
          Vuelve más tarde para nuevas misiones
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={missions}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <MissionCard mission={item} onPress={() => onMissionPress?.(item)} />
      )}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor="#4CAF50"
          colors={["#4CAF50"]}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default MissionsList;
