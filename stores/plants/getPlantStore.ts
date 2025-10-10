import api from "@/services/api";
import { Plant } from "@/types/Plant";
import { create } from "zustand";

interface GetPlantState {
  plant: Plant | null;
  isLoading: boolean;
  getPlant: (id: string) => Promise<void>;
}

export const useGetPlantStore = create<GetPlantState>((set) => ({
  plant: null,
  isLoading: false,

  getPlant: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await api.get<Plant>(`/plants/${id}`);
      set({ plant: response.data });
      set({ isLoading: false });
    } catch (error) {
      console.error("Error fetching plant:", error);
    }
  },
}));
