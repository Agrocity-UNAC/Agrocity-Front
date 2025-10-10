import { useGetPlantStore } from "@/stores/plants/getPlantStore";
import { useEffect } from "react";

export const usePlant = (id: string) => {
  const { plant, isLoading, getPlant } = useGetPlantStore();

  useEffect(() => {
    getPlant(id);
  }, [getPlant, id]);

  return {
    plant,
    isLoading,
    refreshPlant: () => getPlant(id),
  };
};
