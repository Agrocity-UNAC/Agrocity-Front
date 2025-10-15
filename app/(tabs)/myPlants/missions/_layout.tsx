import { Stack } from "expo-router";
import React from "react";

const MissionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="available"
        options={{ headerShown: false, title: "Misiones Disponibles" }}
      />
    </Stack>
  );
};

export default MissionsLayout;
