import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = "+",
  iconName,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      onPress={onPress}
    >
      {iconName ? (
        <Ionicons name={iconName} size={24} color="#333" />
      ) : (
        <Text style={styles.icon}>{icon}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ scale: 0.96 }],
  },
  icon: {
    fontSize: 28,
    color: "#333",
    fontWeight: "300",
    lineHeight: 28,
  },
});

export default FloatingActionButton;
