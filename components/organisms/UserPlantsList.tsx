import { UserPlant } from "@/types/UserPlant";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserPlantCard from "../molecules/UserPlantCard";

interface UserPlantsListProps {
  userPlants: UserPlant[];
  isLoading: boolean;
  onRefresh: () => void;
  onPlantPress?: (userPlant: UserPlant) => void;
}

const UserPlantsList: React.FC<UserPlantsListProps> = ({
  userPlants,
  isLoading,
  onRefresh,
  onPlantPress,
}) => {
  const renderUserPlantItem = ({ item }: ListRenderItemInfo<UserPlant>) => (
    <UserPlantCard
      userPlant={item}
      onPress={() => onPlantPress && onPlantPress(item)}
    />
  );

  if (isLoading && userPlants.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando tus plantas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userPlants}
      keyExtractor={(item) => item._id}
      renderItem={renderUserPlantItem}
      onRefresh={onRefresh}
      refreshing={isLoading}
      contentContainerStyle={[
        styles.listContent,
        userPlants.length === 0 && styles.emptyContainer,
      ]}
      ListEmptyComponent={
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyTitle}>🌱 No tienes plantas aún</Text>
          <Text style={styles.emptyDescription}>
            Comienza tu jardín agregando tu primera planta
          </Text>
        </View>
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
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default UserPlantsList;
