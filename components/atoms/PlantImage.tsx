import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

interface PlantImageProps {
  imageUrl: string;
  userImages?: string[];
  size?: "small" | "medium" | "large";
}

const PlantImage: React.FC<PlantImageProps> = ({
  imageUrl,
  userImages,
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

  // Función para obtener la imagen correcta
  const getImageSource = () => {
    if (hasError) {
      return defaultImage;
    }

    // Si hay imágenes del usuario, usar la última
    if (userImages && userImages.length > 0) {
      const lastUserImage = userImages[userImages.length - 1];
      return { uri: lastUserImage };
    }

    // Si no hay imágenes del usuario, usar la imagen por defecto de la planta
    return { uri: imageUrl };
  };

  return (
    <View style={[styles.container, styles[size]]}>
      <Image
        source={getImageSource()}
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
