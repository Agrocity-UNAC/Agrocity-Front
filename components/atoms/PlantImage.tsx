import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

interface PlantImageProps {
  imageUrl: string;
  size?: "small" | "medium" | "large";
}

const PlantImage: React.FC<PlantImageProps> = ({
  imageUrl,
  size = "medium",
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeStyles = {
    small: { width: 50, height: 50 },
    medium: { width: 80, height: 80 },
    large: { width: 120, height: 120 },
  };

  // Imagen por defecto que se usará en caso de error
  const defaultImage = require("@/assets/images/default-plant-image.png");

  return (
    <View style={[styles.container, styles[size]]}>
      <Image
        source={hasError ? defaultImage : { uri: imageUrl }}
        style={[styles.image, sizeStyles[size]]}
        resizeMode="cover"
        onError={() => setHasError(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  small: {
    width: 50,
    height: 50,
  },
  medium: {
    width: 80,
    height: 80,
  },
  large: {
    width: 120,
    height: 120,
  },
});

export default PlantImage;
