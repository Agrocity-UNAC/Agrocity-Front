import { router } from "expo-router";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async () => {
    clearError();

    try {
      await login(email, password);
      // Redirigir al index de (tabs) después del login exitoso
      router.replace("/(tabs)");
    } catch (error) {
      // El error ya se maneja en el store
      console.error("Login failed:", error);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    clearError();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    resetForm,
    isLoading,
    error,
  };
};
