import { Stack } from "expo-router";
import React from "react";

const MyPlantsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="add"
        options={{ headerShown: false, title: "Agregar Planta" }}
      />
      <Stack.Screen
        name="[userPlantId]"
        options={{ headerShown: false, title: "Detalle de Planta" }}
      />
      <Stack.Screen
        name="edit/[userPlantId]"
        options={{ headerShown: false, title: "Editar Planta" }}
      />
      <Stack.Screen
        name="missions"
        options={{ headerShown: false, title: "Misiones" }}
      />
    </Stack>
  );
};

export default MyPlantsLayout;
