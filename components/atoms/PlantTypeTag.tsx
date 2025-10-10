import { PlantType } from "@/types/Plant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PlantTypeTagProps {
  type: PlantType;
}

const PlantTypeTag: React.FC<PlantTypeTagProps> = ({ type }) => {
  const getTypeColor = () => {
    switch (type) {
      case PlantType.VEGETABLE:
        return "#4CAF50"; // Verde
      case PlantType.HERB:
        return "#8BC34A"; // Verde claro
      case PlantType.FRUIT:
        return "#FF9800"; // Naranja
      case PlantType.FLOWER:
        return "#E91E63"; // Rosa
      case PlantType.SUCCULENT:
        return "#009688"; // Verde azulado
      case PlantType.TREE:
        return "#795548"; // Marrón
      case PlantType.SHRUB:
        return "#607D8B"; // Azul grisáceo
      case PlantType.VINE:
        return "#3F51B5"; // Índigo
      case PlantType.GRAIN:
        return "#FFC107"; // Ámbar
      case PlantType.LEGUME:
        return "#9C27B0"; // Púrpura
      default:
        return "#9E9E9E"; // Gris
    }
  };

  const getTypeText = () => {
    switch (type) {
      case PlantType.VEGETABLE:
        return "Vegetal";
      case PlantType.HERB:
        return "Hierba";
      case PlantType.FRUIT:
        return "Fruta";
      case PlantType.FLOWER:
        return "Flor";
      case PlantType.SUCCULENT:
        return "Suculenta";
      case PlantType.TREE:
        return "Árbol";
      case PlantType.SHRUB:
        return "Arbusto";
      case PlantType.VINE:
        return "Enredadera";
      case PlantType.GRAIN:
        return "Cereal";
      case PlantType.LEGUME:
        return "Legumbre";
      default:
        return "Otro";
    }
  };

  return (
    <View style={[styles.tag, { backgroundColor: getTypeColor() }]}>
      <Text style={styles.text}>{getTypeText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default PlantTypeTag;
