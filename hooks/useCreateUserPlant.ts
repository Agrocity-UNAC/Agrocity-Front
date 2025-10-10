import { useUserPlantsStore } from "@/stores/plants/userPlantsStore";
import { useState } from "react";

interface CreateUserPlantData {
  plantId: string;
  nickname: string;
}

export const useCreateUserPlant = () => {
  const { createUserPlant, isCreating } = useUserPlantsStore();
  const [error, setError] = useState<string | null>(null);

  const addUserPlant = async (data: CreateUserPlantData) => {
    try {
      setError(null);
      const newPlant = await createUserPlant(data);
      return { success: true, data: newPlant };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "No se pudo agregar la planta. Por favor intenta de nuevo.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    addUserPlant,
    isCreating,
    error,
    clearError,
  };
};
