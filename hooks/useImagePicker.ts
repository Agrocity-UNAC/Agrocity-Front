import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export interface SelectedImage {
  uri: string;
  fileName: string;
  mimeType: string;
}

export const useImagePicker = () => {
  const [isPickingImage, setIsPickingImage] = useState(false);

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos requeridos",
        "Necesitamos acceso a tu cámara para tomar fotos."
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos requeridos",
        "Necesitamos acceso a tu galería para seleccionar fotos."
      );
      return false;
    }
    return true;
  };

  const pickImageFromCamera = async (): Promise<SelectedImage | null> => {
    setIsPickingImage(true);

    try {
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        setIsPickingImage(false);
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      setIsPickingImage(false);

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        fileName: asset.fileName || `photo_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      };
    } catch {
      setIsPickingImage(false);
      Alert.alert("Error", "No se pudo tomar la foto. Inténtalo de nuevo.");
      return null;
    }
  };

  const pickImageFromGallery = async (): Promise<SelectedImage | null> => {
    setIsPickingImage(true);

    try {
      const hasPermission = await requestGalleryPermissions();
      if (!hasPermission) {
        setIsPickingImage(false);
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      setIsPickingImage(false);

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        fileName: asset.fileName || `image_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      };
    } catch {
      setIsPickingImage(false);
      Alert.alert(
        "Error",
        "No se pudo seleccionar la imagen. Inténtalo de nuevo."
      );
      return null;
    }
  };

  const pickMultipleImagesFromGallery = async (): Promise<SelectedImage[]> => {
    setIsPickingImage(true);

    try {
      const hasPermission = await requestGalleryPermissions();
      if (!hasPermission) {
        setIsPickingImage(false);
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      setIsPickingImage(false);

      if (result.canceled) {
        return [];
      }

      return result.assets.map((asset) => ({
        uri: asset.uri,
        fileName: asset.fileName || `image_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      }));
    } catch {
      setIsPickingImage(false);
      Alert.alert(
        "Error",
        "No se pudieron seleccionar las imágenes. Inténtalo de nuevo."
      );
      return [];
    }
  };

  return {
    isPickingImage,
    pickImageFromCamera,
    pickImageFromGallery,
    pickMultipleImagesFromGallery,
  };
};
