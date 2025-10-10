import api from "@/services/api";
import { UserPlant } from "@/types/UserPlant";
import { create } from "zustand";

interface CreateUserPlantData {
  plantId: string;
  nickname: string;
}

interface UserPlantsState {
  userPlants: UserPlant[];
  isLoading: boolean;
  isCreating: boolean;
  isWatering: boolean;
  isFertilizing: boolean;
  getUserPlants: () => Promise<void>;
  createUserPlant: (data: CreateUserPlantData) => Promise<UserPlant>;
  waterPlant: (userPlantId: string) => Promise<UserPlant>;
  fertilizePlant: (userPlantId: string) => Promise<UserPlant>;
}

export const useUserPlantsStore = create<UserPlantsState>((set, get) => ({
  userPlants: [],
  isLoading: false,
  isCreating: false,
  isWatering: false,
  isFertilizing: false,

  getUserPlants: async () => {
    set({ isLoading: true });

    try {
      const response = await api.get<UserPlant[]>("/user-plants/my-plants");
      set({ userPlants: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createUserPlant: async (data: CreateUserPlantData) => {
    set({ isCreating: true });

    try {
      const response = await api.post<UserPlant>("/user-plants", data);

      // Agregar la nueva planta a la lista local
      set((state) => ({
        userPlants: [...state.userPlants, response.data],
        isCreating: false,
      }));

      return response.data;
    } catch (error) {
      set({ isCreating: false });
      throw error;
    }
  },

  waterPlant: async (userPlantId: string) => {
    set({ isWatering: true });

    try {
      const response = await api.post<UserPlant>(
        `/user-plants/water-plant/${userPlantId}`
      );

      // Actualizar la planta en la lista local
      set((state) => ({
        userPlants: state.userPlants.map((plant) =>
          plant._id === userPlantId ? response.data : plant
        ),
        isWatering: false,
      }));

      return response.data;
    } catch (error) {
      set({ isWatering: false });
      throw error;
    }
  },

  fertilizePlant: async (userPlantId: string) => {
    set({ isFertilizing: true });

    try {
      const response = await api.post<UserPlant>(
        `/user-plants/fertilize-plat/${userPlantId}`
      );

      // Actualizar la planta en la lista local
      set((state) => ({
        userPlants: state.userPlants.map((plant) =>
          plant._id === userPlantId ? response.data : plant
        ),
        isFertilizing: false,
      }));

      return response.data;
    } catch (error) {
      set({ isFertilizing: false });
      throw error;
    }
  },
}));
