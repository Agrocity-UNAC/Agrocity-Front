import { useAssignMissionStore } from "@/stores/missions/assignMissionStore";
import { useCallback } from "react";

export const useAssignMission = () => {
  const { isLoading, error, success, assignMission, resetState } =
    useAssignMissionStore();

  const handleAssignMission = useCallback(
    async (missionId: string) => {
      try {
        await assignMission(missionId);
        return { success: true, error: null };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    [assignMission]
  );

  return {
    isLoading,
    error,
    success,
    assignMission: handleAssignMission,
    resetState,
  };
};
