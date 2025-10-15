import api from "@/services/api";
import { Mission } from "@/types/Mission";
import { create } from "zustand";

interface getAvalibleMissionsStatus {
  missions: Mission[];
  isLoading: boolean;
  error: string | null;
  fetchMissions: () => Promise<void>;
}

export const useGetAvalibleMissionsStore = create<getAvalibleMissionsStatus>(
  (set, get) => ({
    missions: [],
    isLoading: false,
    error: null,

    fetchMissions: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.get("/missions/available");

        set({ missions: response.data, isLoading: false, error: null });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error fetching missions";

        throw new Error(errorMessage);
      }
    },
  })
);
