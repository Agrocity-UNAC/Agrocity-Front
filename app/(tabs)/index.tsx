import { LevelProgressCard } from "@/components/molecules/LevelProgressCard";
import { UserStatsGrid } from "@/components/molecules/UserStatsGrid";
import { WelcomeHeader } from "@/components/molecules/WelcomeHeader";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user, isLoadingAuth } = useAuthStore();

  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No se pudo cargar la información</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <WelcomeHeader name={user.name} rank={user.rank} />

        {/* Level Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Progreso</Text>
          <LevelProgressCard
            level={user.level}
            experience={user.experience}
            rank={user.rank}
          />
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <UserStatsGrid
            level={user.level}
            currentPoints={user.currentPoints}
            currentStreak={user.currentStreak}
            longestStreak={user.longestStreak}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus Logros</Text>
          <View style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <Ionicons name="trophy" size={32} color="#FFD700" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>
                Insignias Desbloqueadas
              </Text>
              <Text style={styles.achievementValue}>
                {user.unlockedBadges.length}
              </Text>
            </View>
          </View>

          <View style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <Ionicons
                name="checkmark-done-circle"
                size={32}
                color="#4CAF50"
              />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Misiones Completadas</Text>
              <Text style={styles.achievementValue}>
                {user.completedMissions.length}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  achievementCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  achievementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  achievementValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
});

export default Home;
