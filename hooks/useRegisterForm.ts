import { router } from "expo-router";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

export const useRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, isLoading, error, clearError } = useAuthStore();

  const validateForm = () => {
    if (!name.trim()) {
      return "El nombre es requerido";
    }

    if (!email.trim()) {
      return "El email es requerido";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Ingresa un email válido";
    }

    if (!password.trim()) {
      return "La contraseña es requerida";
    }

    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      return validationError;
    }

    clearError();

    try {
      await register(email, name, password);
      // Redirigir al index de (tabs) después del registro exitoso
      router.replace("/(tabs)");
      return null;
    } catch (error) {
      // El error ya se maneja en el store
      console.error("Register failed:", error);
      return null;
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    clearError();
  };

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length >= 6 &&
    confirmPassword.trim().length > 0 &&
    password === confirmPassword;

  return {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    resetForm,
    isLoading,
    error,
    isFormValid,
  };
};
