import { useGetAvalibleMissionsStore } from "@/stores/missions/getAvalibleMissionsStore";
import { useCallback, useEffect, useState } from "react";

export const useAvailableMissions = () => {
  const { missions, isLoading, error, fetchMissions } =
    useGetAvalibleMissionsStore();
  const [refreshing, setRefreshing] = useState(false);

  const loadMissions = useCallback(async () => {
    try {
      await fetchMissions();
    } catch (error) {
      console.error("Error loading missions:", error);
    }
  }, [fetchMissions]);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  const refreshMissions = async () => {
    setRefreshing(true);
    try {
      await fetchMissions();
    } catch (error) {
      console.error("Error refreshing missions:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return {
    missions,
    isLoading,
    error,
    refreshing,
    refreshMissions,
    loadMissions,
  };
};
