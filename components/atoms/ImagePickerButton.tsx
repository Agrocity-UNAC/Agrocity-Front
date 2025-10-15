import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImagePickerButtonProps {
  onPressCamera: () => void;
  onPressGallery: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  onPressCamera,
  onPressGallery,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.cameraButton,
          (disabled || isLoading) && styles.buttonDisabled,
        ]}
        onPress={onPressCamera}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.buttonText}>Cámara</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.galleryButton,
          (disabled || isLoading) && styles.buttonDisabled,
        ]}
        onPress={onPressGallery}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="images" size={24} color="#fff" />
            <Text style={styles.buttonText}>Galería</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 8,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  cameraButton: {
    backgroundColor: "#2196F3",
  },
  galleryButton: {
    backgroundColor: "#4CAF50",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ImagePickerButton;
