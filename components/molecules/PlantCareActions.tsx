import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PlantCareActionsProps {
  onWater: () => void;
  onFertilize: () => void;
  isWatering: boolean;
  isFertilizing: boolean;
}

export const PlantCareActions: React.FC<PlantCareActionsProps> = ({
  onWater,
  onFertilize,
  isWatering,
  isFertilizing,
}) => {
  return (
    <View style={styles.container}>
      {/* Water Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.waterButton]}
        onPress={onWater}
        disabled={isWatering || isFertilizing}
        activeOpacity={0.7}
      >
        {isWatering ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons name="water" size={24} color="#fff" />
        )}
        <Text style={styles.buttonText}>
          {isWatering ? "Regando..." : "Regar"}
        </Text>
      </TouchableOpacity>

      {/* Fertilize Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.fertilizeButton]}
        onPress={onFertilize}
        disabled={isWatering || isFertilizing}
        activeOpacity={0.7}
      >
        {isFertilizing ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons name="nutrition" size={24} color="#fff" />
        )}
        <Text style={styles.buttonText}>
          {isFertilizing ? "Fertilizando..." : "Fertilizar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  waterButton: {
    backgroundColor: "#2196F3",
  },
  fertilizeButton: {
    backgroundColor: "#8BC34A",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
