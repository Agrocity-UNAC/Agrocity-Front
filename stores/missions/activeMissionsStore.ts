import api from "@/services/api";
import { UserMission } from "@/types/UserMission";
import { create } from "zustand";

interface ActiveMissionsState {
  userMissions: UserMission[];
  isLoading: boolean;
  error: string | null;
  fetchActiveMissions: () => Promise<void>;
}

export const useActiveMissionsStore = create<ActiveMissionsState>((set) => ({
  userMissions: [],
  isLoading: false,
  error: null,

  fetchActiveMissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/user-missions/active");
      set({ userMissions: response.data, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al cargar las misiones activas";
      set({ isLoading: false, error: errorMessage, userMissions: [] });
      throw new Error(errorMessage);
    }
  },
}));
