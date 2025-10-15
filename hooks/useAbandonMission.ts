import { useAbandonMissionStore } from "@/stores/missions/abandonMissionStore";
import { useCallback } from "react";

export const useAbandonMission = () => {
  const { isLoading, error, success, abandonMission, resetState } =
    useAbandonMissionStore();

  const handleAbandonMission = useCallback(
    async (userMissionId: string) => {
      try {
        await abandonMission(userMissionId);
        return { success: true, error: null };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    [abandonMission]
  );

  return {
    isLoading,
    error,
    success,
    abandonMission: handleAbandonMission,
    resetState,
  };
};
