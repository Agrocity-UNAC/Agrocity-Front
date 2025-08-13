import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Plant {
  id: string;
  name: string;
  type: string;
  water: number;
  sun: number;
  health: number;
  level: number;
  createdAt: Date;
}

const Home = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);

  const plantTypes = [
    { name: "Tomate", icon: "🍅" },
    { name: "Lechuga", icon: "🥬" },
    { name: "Zanahoria", icon: "🥕" },
    { name: "Fresa", icon: "🍓" },
    { name: "Pepino", icon: "🥒" },
    { name: "Cebolla", icon: "🧅" },
  ];

  const addPlant = () => {
    if (!plantName.trim() || !plantType) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const newPlant: Plant = {
      id: Date.now().toString(),
      name: plantName.trim(),
      type: plantType,
      water: 100,
      sun: 100,
      health: 100,
      level: 1,
      createdAt: new Date(),
    };

    setPlants([...plants, newPlant]);
    setPlantName("");
    setPlantType("");
    setShowAddModal(false);
  };

  const waterPlant = (plantId: string) => {
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, water: Math.min(100, plant.water + 30) }
        : plant
    ));
  };

  const giveSun = (plantId: string) => {
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, sun: Math.min(100, plant.sun + 30) }
        : plant
    ));
  };

  const getPlantIcon = (type: string) => {
    const plantType = plantTypes.find(pt => pt.name === type);
    return plantType ? plantType.icon : "🌱";
  };

  const getPlantStatus = (plant: Plant) => {
    if (plant.water < 30 || plant.sun < 30) return "😰";
    if (plant.water < 50 || plant.sun < 50) return "😐";
    return "😊";
  };

  const renderPlantSlot = (index: number) => {
    const plant = plants[index];
    
    if (plant) {
      return (
        <TouchableOpacity
          key={plant.id}
          style={styles.plantSlot}
          onPress={() => {
            setSelectedPlant(plant);
            setShowPlantModal(true);
          }}
        >
          <Text style={styles.plantIcon}>{getPlantIcon(plant.type)}</Text>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantStatus}>{getPlantStatus(plant)}</Text>
          <View style={styles.plantStats}>
            <View style={styles.statBar}>
              <Ionicons name="water" size={12} color="#3b82f6" />
              <View style={[styles.statFill, { width: `${plant.water}%` }]} />
            </View>
            <View style={styles.statBar}>
              <Ionicons name="sunny" size={12} color="#f59e0b" />
              <View style={[styles.statFill, { width: `${plant.sun}%` }]} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.emptySlot}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.starButton}>
            <Ionicons name="star" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>¡Mi Huerto!</Text>
            <Text style={styles.subtitle}>Nivel 1 - Granjero Experto</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.coinButton}>
            <Ionicons name="cash" size={16} color="#fff" />
            <Text style={styles.coinText}>150</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.xpButton}>
            <Ionicons name="person" size={16} color="#fff" />
            <Text style={styles.xpText}>0 XP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.plantGrid}>
          {Array.from({ length: 9 }, (_, index) => renderPlantSlot(index))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={20} color="#4CAF50" />
          <Text style={styles.statTitle}>Plantas</Text>
          <Text style={styles.statSubtitle}>Activas</Text>
          <Text style={styles.statNumber}>{plants.length}/12</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="water" size={20} color="#3b82f6" />
          <Text style={styles.statTitle}>Plantas</Text>
          <Text style={styles.statSubtitle}>Sedientas</Text>
          <Text style={styles.statNumber}>
            {plants.filter(p => p.water < 30).length}
          </Text>
        </View>
      </View>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Nueva Planta!</Text>
            
            <Text style={styles.inputLabel}>Nombre de tu planta:</Text>
            <TextInput
              style={styles.input}
              value={plantName}
              onChangeText={setPlantName}
              placeholder="Ej: Tomatito"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Tipo de planta:</Text>
            <View style={styles.typeGrid}>
              {plantTypes.map((type) => (
                <TouchableOpacity
                  key={type.name}
                  style={[
                    styles.typeOption,
                    plantType === type.name && styles.typeOptionSelected
                  ]}
                  onPress={() => setPlantType(type.name)}
                >
                  <Text style={styles.typeIcon}>{type.icon}</Text>
                  <Text style={styles.typeName}>{type.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addPlant}
              >
                <Text style={styles.addButtonText}>¡Plantar!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showPlantModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPlantModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlant && (
              <>
                <Text style={styles.modalTitle}>{selectedPlant.name}</Text>
                <Text style={styles.plantTypeText}>{selectedPlant.type}</Text>
                
                <View style={styles.plantDisplay}>
                  <Text style={styles.bigPlantIcon}>{getPlantIcon(selectedPlant.type)}</Text>
                  <Text style={styles.plantStatus}>{getPlantStatus(selectedPlant)}</Text>
                </View>

                <View style={styles.careStats}>
                  <View style={styles.careStat}>
                    <Ionicons name="water" size={24} color="#3b82f6" />
                    <Text style={styles.careStatText}>Agua: {selectedPlant.water}%</Text>
                    <TouchableOpacity
                      style={styles.careButton}
                      onPress={() => waterPlant(selectedPlant.id)}
                    >
                      <Text style={styles.careButtonText}>💧 Regar</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.careStat}>
                    <Ionicons name="sunny" size={24} color="#f59e0b" />
                    <Text style={styles.careStatText}>Sol: {selectedPlant.sun}%</Text>
                    <TouchableOpacity
                      style={styles.careButton}
                      onPress={() => giveSun(selectedPlant.id)}
                    >
                      <Text style={styles.careButtonText}>☀️ Dar Sol</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowPlantModal(false)}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  starButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f59e0b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  coinText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  xpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  plantGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  emptySlot: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#f59e0b",
    borderStyle: "dashed",
  },
  plusIcon: {
    fontSize: 32,
    color: "#f59e0b",
    fontWeight: "bold",
  },
  plantSlot: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  plantIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  plantName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#166534",
    textAlign: "center",
    marginBottom: 2,
  },
  plantStatus: {
    fontSize: 16,
    marginBottom: 4,
  },
  plantStats: {
    width: "100%",
  },
  statBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginBottom: 2,
    position: "relative",
  },
  statFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
  },
  statSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  typeOption: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  typeOptionSelected: {
    borderColor: "#4CAF50",
    backgroundColor: "#dcfce7",
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
  },
  cancelButton: {
    backgroundColor: "#6b7280",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  plantTypeText: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
  },
  plantDisplay: {
    alignItems: "center",
    marginBottom: 25,
  },
  bigPlantIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  careStats: {
    width: "100%",
    gap: 20,
  },
  careStat: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 12,
  },
  careStatText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    marginLeft: 10,
  },
  careButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  careButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: "#6b7280",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default Home;
