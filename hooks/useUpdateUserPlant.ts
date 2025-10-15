import { useUserPlantsStore } from "@/stores/plants/userPlantsStore";
import { useState } from "react";

interface UpdateUserPlantData {
  nickname?: string;
  imageUris?: string[];
}

export const useUpdateUserPlant = () => {
  const { updateUserPlant, isUpdating } = useUserPlantsStore();
  const [error, setError] = useState<string | null>(null);

  const update = async (userPlantId: string, data: UpdateUserPlantData) => {
    try {
      setError(null);
      const updatedPlant = await updateUserPlant(userPlantId, data);
      return { success: true, data: updatedPlant };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "No se pudo actualizar la planta. Por favor intenta de nuevo.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    updateUserPlant: update,
    isUpdating,
    error,
    clearError,
  };
};
