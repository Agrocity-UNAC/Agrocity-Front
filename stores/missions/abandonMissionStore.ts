import api from "@/services/api";
import { create } from "zustand";

interface AbandonMissionState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  abandonMission: (userMissionId: string) => Promise<void>;
  resetState: () => void;
}

export const useAbandonMissionStore = create<AbandonMissionState>((set) => ({
  isLoading: false,
  error: null,
  success: false,

  abandonMission: async (userMissionId: string) => {
    set({ isLoading: true, error: null, success: false });
    try {
      await api.delete(`/user-missions/${userMissionId}/abandon`);
      set({ isLoading: false, error: null, success: true });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al abandonar la misión";
      set({ isLoading: false, error: errorMessage, success: false });
      throw new Error(errorMessage);
    }
  },

  resetState: () => {
    set({ isLoading: false, error: null, success: false });
  },
}));
