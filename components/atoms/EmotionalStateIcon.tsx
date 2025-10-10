import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface EmotionalStateIconProps {
  state: string;
  size?: number;
}

export const EmotionalStateIcon: React.FC<EmotionalStateIconProps> = ({
  state,
  size = 80,
}) => {
  const getStateConfig = () => {
    switch (state) {
      case "HAPPY":
        return { icon: "happy-outline" as const, color: "#4CAF50" };
      case "THIRSTY":
        return { icon: "water-outline" as const, color: "#2196F3" };
      case "COLD":
        return { icon: "snow-outline" as const, color: "#03A9F4" };
      case "HOT":
        return { icon: "flame-outline" as const, color: "#FF5722" };
      case "LOW_LIGHT":
        return { icon: "sunny-outline" as const, color: "#FFC107" };
      case "OVERWATERED":
        return { icon: "water" as const, color: "#2196F3" };
      case "CRITICAL":
        return { icon: "warning-outline" as const, color: "#F44336" };
      default:
        return { icon: "leaf-outline" as const, color: "#4CAF50" };
    }
  };

  const config = getStateConfig();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${config.color}15`,
          width: size * 1.5,
          height: size * 1.5,
        },
      ]}
    >
      <Ionicons name={config.icon} size={size} color={config.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
