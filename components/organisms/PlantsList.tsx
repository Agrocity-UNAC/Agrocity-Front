import { BasePlant } from "@/types/Plant";
import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import PlantCard from "../molecules/PlantCard";

interface PlantsListProps {
  plants: BasePlant[];
  isLoading: boolean;
  onRefresh: () => void;
  onPlantPress?: (plant: BasePlant) => void;
}

const PlantsList: React.FC<PlantsListProps> = ({
  plants,
  isLoading,
  onRefresh,
  onPlantPress,
}) => {
  const renderPlantItem = ({ item }: ListRenderItemInfo<BasePlant>) => (
    <PlantCard
      plant={item}
      onPress={() => onPlantPress && onPlantPress(item)}
    />
  );

  return (
    <FlatList
      data={plants}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderPlantItem}
      onRefresh={onRefresh}
      refreshing={isLoading}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No se encontraron plantas</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});

export default PlantsList;
