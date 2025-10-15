import { useImagePicker } from "@/hooks/useImagePicker";
import { UserPlant } from "@/types/UserPlant";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../atoms/Button";
import ImagePickerButton from "../atoms/ImagePickerButton";
import Input from "../atoms/Input";
import ImageGalleryPreview from "../molecules/ImageGalleryPreview";

interface EditUserPlantFormProps {
  userPlant: UserPlant;
  isUpdating: boolean;
  onSubmit: (nickname: string, imageUris: string[]) => void;
  onCancel?: () => void;
}

const EditUserPlantForm: React.FC<EditUserPlantFormProps> = ({
  userPlant,
  isUpdating,
  onSubmit,
  onCancel,
}) => {
  const [nickname, setNickname] = useState(userPlant.nickname);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    nickname?: string;
  }>({});

  const { isPickingImage, pickImageFromCamera, pickMultipleImagesFromGallery } =
    useImagePicker();

  const handlePickImageFromCamera = async () => {
    const image = await pickImageFromCamera();
    if (image) {
      setSelectedImages((prev) => [...prev, image.uri]);
    }
  };

  const handlePickImagesFromGallery = async () => {
    const images = await pickMultipleImagesFromGallery();
    if (images.length > 0) {
      setSelectedImages((prev) => [...prev, ...images.map((img) => img.uri)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: { nickname?: string } = {};

    if (!nickname.trim()) {
      newErrors.nickname = "El apodo es requerido";
    } else if (nickname.trim().length < 2) {
      newErrors.nickname = "El apodo debe tener al menos 2 caracteres";
    } else if (nickname.trim().length > 50) {
      newErrors.nickname = "El apodo no puede tener más de 50 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(nickname.trim(), selectedImages);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Editar información</Text>
        <Input
          label="Apodo"
          placeholder="Ej: Mi Tomate del Balcón"
          value={nickname}
          onChangeText={(text) => {
            setNickname(text);
            setErrors((prev) => ({ ...prev, nickname: undefined }));
          }}
          error={errors.nickname}
          maxLength={50}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Agregar nuevas fotos (opcional)</Text>
        <Text style={styles.sectionDescription}>
          Las nuevas fotos se agregarán a tu colección existente
        </Text>
        {userPlant.images && userPlant.images.length > 0 && (
          <View style={styles.currentImagesInfo}>
            <Text style={styles.currentImagesText}>
              📷 Tienes {userPlant.images.length} foto
              {userPlant.images.length !== 1 ? "s" : ""} actualmente
            </Text>
          </View>
        )}
        <ImagePickerButton
          onPressCamera={handlePickImageFromCamera}
          onPressGallery={handlePickImagesFromGallery}
          isLoading={isPickingImage}
          disabled={isUpdating}
        />
        {selectedImages.length > 0 && (
          <>
            <Text style={styles.newImagesLabel}>Nuevas fotos a agregar:</Text>
            <ImageGalleryPreview
              images={selectedImages}
              onRemoveImage={handleRemoveImage}
            />
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={isUpdating ? "Guardando..." : "Guardar Cambios"}
          onPress={handleSubmit}
          loading={isUpdating}
          disabled={isUpdating}
          style={styles.submitButton}
        />
        {onCancel && (
          <Button
            title="Cancelar"
            onPress={onCancel}
            variant="outline"
            disabled={isUpdating}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  currentImagesInfo: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  currentImagesText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },
  newImagesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginBottom: 16,
  },
  submitButton: {
    marginBottom: 8,
  },
});

export default EditUserPlantForm;
