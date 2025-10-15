import api from "@/services/api";
import { create } from "zustand";

interface AssignMissionState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  assignMission: (missionId: string) => Promise<void>;
  resetState: () => void;
}

export const useAssignMissionStore = create<AssignMissionState>((set) => ({
  isLoading: false,
  error: null,
  success: false,

  assignMission: async (missionId: string) => {
    set({ isLoading: true, error: null, success: false });
    try {
      await api.post("/user-missions/assign", { missionId });
      set({ isLoading: false, error: null, success: true });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al asignar la misión";
      set({ isLoading: false, error: errorMessage, success: false });
      throw new Error(errorMessage);
    }
  },

  resetState: () => {
    set({ isLoading: false, error: null, success: false });
  },
}));
