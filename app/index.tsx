import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isLoadingAuth } = useAuthStore();

  // Si está cargando, no hacer nada (el _layout.tsx mostrará la pantalla de carga)
  if (isLoadingAuth) {
    return null;
  }

  // Si está autenticado, redirigir a tabs
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // Si no está autenticado, redirigir a login
  return <Redirect href="/inicio/login" />;
} 