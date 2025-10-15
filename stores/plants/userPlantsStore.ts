import api from "@/services/api";
import { UserPlant } from "@/types/UserPlant";
import { create } from "zustand";

interface CreateUserPlantData {
  plantId: string;
  nickname: string;
  imageUris?: string[];
}

interface UpdateUserPlantData {
  nickname?: string;
  imageUris?: string[];
}

interface UserPlantsState {
  userPlants: UserPlant[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isWatering: boolean;
  isFertilizing: boolean;
  getUserPlants: () => Promise<void>;
  createUserPlant: (data: CreateUserPlantData) => Promise<UserPlant>;
  updateUserPlant: (
    userPlantId: string,
    data: UpdateUserPlantData
  ) => Promise<UserPlant>;
  waterPlant: (userPlantId: string) => Promise<UserPlant>;
  fertilizePlant: (userPlantId: string) => Promise<UserPlant>;
}

export const useUserPlantsStore = create<UserPlantsState>((set, get) => ({
  userPlants: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
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
      const formData = new FormData();
      formData.append("plantId", data.plantId);
      formData.append("nickname", data.nickname);

      // Agregar imágenes si existen
      if (data.imageUris && data.imageUris.length > 0) {
        data.imageUris.forEach((uri, index) => {
          const filename = uri.split("/").pop() || `image_${index}.jpg`;
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("images", {
            uri,
            name: filename,
            type,
          } as any);
        });
      }

      const response = await api.post<UserPlant>("/user-plants", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  updateUserPlant: async (userPlantId: string, data: UpdateUserPlantData) => {
    set({ isUpdating: true });

    try {
      const formData = new FormData();

      if (data.nickname) {
        formData.append("nickname", data.nickname);
      }

      // Agregar imágenes si existen
      if (data.imageUris && data.imageUris.length > 0) {
        data.imageUris.forEach((uri, index) => {
          const filename = uri.split("/").pop() || `image_${index}.jpg`;
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("images", {
            uri,
            name: filename,
            type,
          } as any);
        });
      }

      const response = await api.patch<UserPlant>(
        `/user-plants/${userPlantId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Actualizar la planta en la lista local
      set((state) => ({
        userPlants: state.userPlants.map((plant) =>
          plant._id === userPlantId ? response.data : plant
        ),
        isUpdating: false,
      }));

      return response.data;
    } catch (error) {
      set({ isUpdating: false });
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
