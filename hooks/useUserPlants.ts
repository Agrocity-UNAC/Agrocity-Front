import { useUserPlantsStore } from "@/stores/plants/userPlantsStore";
import { useEffect } from "react";

export const useUserPlants = () => {
  const { userPlants, isLoading, getUserPlants } = useUserPlantsStore();

  useEffect(() => {
    // Cargar las plantas del usuario cuando el componente se monta
    getUserPlants();
  }, [getUserPlants]);

  return {
    userPlants,
    isLoading,
    refreshUserPlants: () => getUserPlants(),
  };
};
