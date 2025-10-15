import api from "@/services/api";
import { useChatStore } from "@/stores/chatStore";
import { ChatMessage } from "@/types/ChatMessage";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useChatbot = () => {
  const { addMessage, setLoading, isLoading } = useChatStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImagePreview(asset.uri);
      setSelectedImage({
        uri: asset.uri,
        type: "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImagePreview(asset.uri);
      setSelectedImage({
        uri: asset.uri,
        type: "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      });
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
  };

  const sendMessage = async (text?: string) => {
    if (!text?.trim() && !selectedImage) {
      return;
    }

    try {
      setLoading(true);

      // Add user message to chat
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        text: text?.trim(),
        image: imagePreview || undefined,
        sender: "user",
        timestamp: new Date(),
      };
      addMessage(userMessage);

      // Prepare FormData
      const formData = new FormData();

      if (text?.trim()) {
        formData.append("text", text.trim());
      }

      if (selectedImage) {
        const file = {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.name,
        } as any;
        formData.append("image", file);
      }

      // Send to API
      const response = await api.post("/chatbot/message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        text: response.data.message || response.data.text || response.data,
        sender: "ai",
        timestamp: new Date(),
      };
      addMessage(aiMessage);

      // Clear input
      clearImage();
    } catch (error: any) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: `ai_error_${Date.now()}`,
        text: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        sender: "ai",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    pickImage,
    takePhoto,
    clearImage,
    imagePreview,
    isLoading,
  };
};
