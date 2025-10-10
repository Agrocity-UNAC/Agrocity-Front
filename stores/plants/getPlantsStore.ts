import api from "@/services/api";
import { BasePlant } from "@/types/Plant";
import { create } from "zustand";

interface GetPlantsState {
  plants: BasePlant[];
  isLoading: boolean;
  getPlants: () => Promise<void>;
}

export const useGetPlantsStore = create<GetPlantsState>((set) => ({
  plants: [],
  isLoading: false,

  getPlants: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<BasePlant[]>("/plants");
      set({ plants: response.data });
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
    set({ isLoading: false });
  },
}));
