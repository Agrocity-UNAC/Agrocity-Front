import { Stack } from "expo-router";
import React from "react";

const WikiLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[plantId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default WikiLayout;
