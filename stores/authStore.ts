import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import api from "../services/api";
import type { User } from "../types/User";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isLoadingAuth: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  fetchProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const getErrorMessage = (error: any): string => {
  if (error.response?.status === 401) {
    return "Credenciales inválidas. Verifica tu email y contraseña.";
  }

  if (error.response?.status === 409) {
    return "Este email ya está registrado. Intenta con otro email.";
  }

  if (error.response?.status === 400) {
    return (
      error.response?.data?.message ||
      "Datos inválidos. Verifica la información ingresada."
    );
  }

  if (!error.response) {
    return "Error de conexión. Verifica tu conexión a internet.";
  }

  if (error.response?.status >= 500) {
    return "Error del servidor. Intenta nuevamente más tarde.";
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  return "Ocurrió un error inesperado. Intenta nuevamente.";
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isLoadingAuth: true,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;

      await SecureStore.setItemAsync("auth_token", access_token);

      const profileResponse = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user = profileResponse.data;

      set({
        user,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  register: async (email: string, name: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // Crear usuario
      await api.post("/users", {
        email,
        name,
        password,
      });

      // Después del registro exitoso, hacer login automáticamente
      await get().login(email, password);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  fetchProfile: async () => {
    const { token } = get();

    if (!token) {
      throw new Error("No hay token disponible");
    }

    try {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;

      set({
        user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: errorMessage,
      });

      await SecureStore.deleteItemAsync("auth_token");
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("auth_token");

      if (storedToken) {
        set({ token: storedToken });

        try {
          await get().fetchProfile();
        } catch (error) {
          await SecureStore.deleteItemAsync("auth_token");
          console.log("Error fetching profile:", error);

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error("Error initializing auth state:", error);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    } finally {
      set({ isLoadingAuth: false });
    }
  },
}));
