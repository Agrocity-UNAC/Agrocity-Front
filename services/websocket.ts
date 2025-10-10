import * as SecureStore from "expo-secure-store";
import { io, Socket } from "socket.io-client";

const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WEBSOCKET_URL || "";

class WebSocketService {
  private socket: Socket | null = null;
  private isInitialized = false;

  async init() {
    if (this.isInitialized && this.socket) {
      return this.socket;
    }

    const token = await SecureStore.getItemAsync("auth_token");

    this.socket = io(WEBSOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      extraHeaders: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });

    this.isInitialized = true;
    return this.socket;
  }

  emit(event: string, data?: any) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("⚠️ WebSocket is not connected. Cannot emit event:", event);
    }
  }

  // Método helper para escuchar eventos
  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  // Método helper para dejar de escuchar eventos
  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  getSocket() {
    return this.socket;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
