import { useActiveMissionsStore } from "@/stores/missions/activeMissionsStore";
import { useCallback, useEffect } from "react";

export const useActiveMissions = () => {
  const { userMissions, isLoading, error, fetchActiveMissions } =
    useActiveMissionsStore();

  const loadActiveMissions = useCallback(async () => {
    try {
      await fetchActiveMissions();
    } catch (error) {
      console.error("Error loading active missions:", error);
    }
  }, [fetchActiveMissions]);

  useEffect(() => {
    loadActiveMissions();
  }, [loadActiveMissions]);

  const refreshActiveMissions = async () => {
    await loadActiveMissions();
  };

  return {
    userMissions,
    isLoading,
    error,
    refreshActiveMissions,
  };
};
