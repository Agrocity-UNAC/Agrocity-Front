import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RankBadge } from "../atoms/RankBadge";

interface WelcomeHeaderProps {
  name: string;
  rank: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name, rank }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()},</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.badgeContainer}>
        <RankBadge rank={rank} size="medium" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
  },
});
