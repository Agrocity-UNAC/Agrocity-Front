import { UserMission } from "@/types/UserMission";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ActiveMissionCard from "../atoms/ActiveMissionCard";

interface ActiveMissionsListProps {
  userMissions: UserMission[];
  isLoading: boolean;
  onRefresh: () => void;
  onMissionPress?: (userMission: UserMission) => void;
  onAbandonMission?: (userMission: UserMission) => void;
  ListHeaderComponent?: React.ReactElement;
}

const ActiveMissionsList: React.FC<ActiveMissionsListProps> = ({
  userMissions,
  isLoading,
  onRefresh,
  onMissionPress,
  onAbandonMission,
  ListHeaderComponent,
}) => {
  if (isLoading && userMissions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando misiones...</Text>
      </View>
    );
  }

  if (!isLoading && userMissions.length === 0) {
    return (
      <>
        {ListHeaderComponent}
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No tienes misiones activas</Text>
          <Text style={styles.emptySubtext}>
            Acepta una misión para empezar a ganar recompensas
          </Text>
        </View>
      </>
    );
  }

  return (
    <FlatList
      data={userMissions}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ActiveMissionCard
          userMission={item}
          onPress={() => onMissionPress?.(item)}
          onAbandon={onAbandonMission}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
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
    paddingHorizontal: 16,
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

export default ActiveMissionsList;
