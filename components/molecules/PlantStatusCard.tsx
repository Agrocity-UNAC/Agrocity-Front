import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EmotionalStateIcon } from "../atoms/EmotionalStateIcon";
import { HealthBar } from "../atoms/HealthBar";
import PlantImage from "../atoms/PlantImage";

interface PlantStatusCardProps {
  nickname: string;
  commonName: string;
  emotionalState: string;
  health: number;
  daysAlive: number;
  plantImageUrl?: string;
  userImages?: string[];
}

export const PlantStatusCard: React.FC<PlantStatusCardProps> = ({
  nickname,
  commonName,
  emotionalState,
  health,
  daysAlive,
  plantImageUrl,
  userImages,
}) => {
  const getEmotionalStateText = () => {
    const states: Record<string, string> = {
      HAPPY: "¡Feliz!",
      THIRSTY: "Tengo sed",
      COLD: "Hace frío",
      HOT: "Hace calor",
      LOW_LIGHT: "Necesito luz",
      OVERWATERED: "Mucha agua",
      CRITICAL: "¡Ayuda!",
    };
    return states[emotionalState] || "Normal";
  };

  // Mostrar imagen del usuario si está disponible, sino el ícono emocional
  const hasUserImages = userImages && userImages.length > 0;

  return (
    <View style={styles.container}>
      {/* Avatar de la planta */}
      <View style={styles.avatarSection}>
        {hasUserImages && plantImageUrl ? (
          <PlantImage
            imageUrl={plantImageUrl}
            userImages={userImages}
            size="large"
          />
        ) : (
          <EmotionalStateIcon state={emotionalState} size={80} />
        )}
        <Text style={styles.emotionalText}>{getEmotionalStateText()}</Text>
      </View>

      {/* Información de la planta */}
      <View style={styles.infoSection}>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text style={styles.commonName}>{commonName}</Text>
        <Text style={styles.daysAlive}>🌱 {daysAlive} días viva</Text>
      </View>

      {/* Barra de salud */}
      <View style={styles.healthSection}>
        <HealthBar health={health} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  emotionalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
  },
  infoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },
  commonName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  daysAlive: {
    fontSize: 14,
    color: "#999",
  },
  healthSection: {
    marginTop: 12,
  },
});
