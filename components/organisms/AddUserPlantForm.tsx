import { BasePlant } from "@/types/Plant";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import PlantSelectorCard from "../molecules/PlantSelectorCard";

interface AddUserPlantFormProps {
  plants: BasePlant[];
  isLoadingPlants: boolean;
  isCreating: boolean;
  onSubmit: (plantId: string, nickname: string) => void;
  onCancel?: () => void;
}

const AddUserPlantForm: React.FC<AddUserPlantFormProps> = ({
  plants,
  isLoadingPlants,
  isCreating,
  onSubmit,
  onCancel,
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState<{
    plant?: string;
    nickname?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { plant?: string; nickname?: string } = {};

    if (!selectedPlantId) {
      newErrors.plant = "Debes seleccionar una planta";
    }

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
    if (validateForm() && selectedPlantId) {
      onSubmit(selectedPlantId, nickname.trim());
    }
  };

  if (isLoadingPlants) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando plantas...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>1. Dale un apodo a tu planta</Text>
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
        <Text style={styles.sectionTitle}>2. Selecciona el tipo de planta</Text>
        {errors.plant && <Text style={styles.errorText}>{errors.plant}</Text>}
        {plants.length === 0 ? (
          <Text style={styles.emptyText}>No hay plantas disponibles</Text>
        ) : (
          plants.map((plant) => (
            <PlantSelectorCard
              key={plant._id}
              plant={plant}
              isSelected={selectedPlantId === plant._id}
              onPress={() => {
                setSelectedPlantId(plant._id);
                setErrors((prev) => ({ ...prev, plant: undefined }));
              }}
            />
          ))
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Agregar Planta"
          onPress={handleSubmit}
          loading={isCreating}
          disabled={isCreating}
          style={styles.submitButton}
        />
        {onCancel && (
          <Button
            title="Cancelar"
            onPress={onCancel}
            variant="outline"
            disabled={isCreating}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    marginBottom: 12,
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

export default AddUserPlantForm;
