import webSocketService from "@/services/websocket";
import { SensorReading } from "@/types/UserPlant";
import { create } from "zustand";

interface MqttPlantStoreState {
  isSubscribed: boolean;
  isConnecting: boolean;
  currentUserPlantId: string | null;
  latestSensorReading: SensorReading | null;
  error: string | null;
  subscribeToPlantUpdates: (userPlantId: string) => void;
  unsubscribeFromPlantUpdates: () => void;
  clearError: () => void;
}

export const useMqttPlantStore = create<MqttPlantStoreState>((set, get) => ({
  isSubscribed: false,
  isConnecting: false,
  currentUserPlantId: null,
  latestSensorReading: null,
  error: null,

  subscribeToPlantUpdates: async (userPlantId: string) => {
    try {
      set({
        isConnecting: true,
        currentUserPlantId: userPlantId,
        error: null,
        latestSensorReading: null,
      });

      const socket = await webSocketService.init();

      // Limpiar listeners anteriores
      socket.removeAllListeners("connect");
      socket.removeAllListeners("disconnect");
      webSocketService.off("subscribed");
      webSocketService.off("sensorReading");
      webSocketService.off("exception");

      // Listen for connection
      socket.on("connect", () => {
        set({ error: null });
        socket.emit("subscribePlant", { userPlantId });
      });

      // Listen for disconnection
      socket.on("disconnect", (reason) => {
        set({
          isSubscribed: false,
          error: `Desconectado: ${reason}`,
        });
      });

      // Listen for subscription confirmation
      webSocketService.on("subscribed", (response) => {
        set({
          isSubscribed: true,
          isConnecting: false,
          error: null,
        });
      });

      // Listen for sensor readings
      webSocketService.on("sensorReading", (reading: SensorReading) => {
        set({ latestSensorReading: reading });
      });

      // Listen for exceptions from backend
      webSocketService.on("exception", (error) => {
        console.error("❌ WebSocket EXCEPTION:", error);
        set({
          isConnecting: false,
          isSubscribed: false,
          error: error.message || "Error desconocido",
        });
      });

      // Conectar el socket
      socket.connect();

      // Si ya está conectado, emitir inmediatamente
      if (socket.connected) {
        socket.emit("subscribePlant", { userPlantId });
      }
    } catch (err: any) {
      console.error("❌ ERROR subscribing to plant:", err);
      set({
        isConnecting: false,
        error: err?.message || "Error al conectar",
      });
      throw err;
    }
  },

  unsubscribeFromPlantUpdates: () => {
    const socket = webSocketService.getSocket();

    // Desconectar todos los listeners
    socket?.removeAllListeners("connect");
    socket?.removeAllListeners("disconnect");
    webSocketService.off("subscribed");
    webSocketService.off("sensorReading");
    webSocketService.off("exception");

    set({
      isSubscribed: false,
      isConnecting: false,
      currentUserPlantId: null,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
