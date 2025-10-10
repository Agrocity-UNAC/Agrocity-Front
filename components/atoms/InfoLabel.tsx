import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoLabelProps {
  label: string;
  value: string | number | null | undefined;
  icon?: React.ReactNode;
}

const InfoLabel: React.FC<InfoLabelProps> = ({ label, value, icon }) => {
  if (!value && value !== 0) return null;

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});

export default InfoLabel;
