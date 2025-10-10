import { useGetPlantsStore } from "@/stores/plants/getPlantsStore";
import { useEffect } from "react";

export const usePlants = () => {
  const { plants, isLoading, getPlants } = useGetPlantsStore();

  useEffect(() => {
    // Cargar las plantas cuando el componente se monta
    getPlants();
  }, [getPlants]);

  return {
    plants,
    isLoading,
    refreshPlants: () => getPlants(),
  };
};
