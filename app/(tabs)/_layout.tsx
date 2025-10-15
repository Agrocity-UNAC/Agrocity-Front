import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const CoreLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#999",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          headerShown: false,
          title: "Wiki",
          tabBarIcon: ({ color }) => (
            <Octicons name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myPlants"
        options={{
          headerShown: false,
          title: "Mis Plantas",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="seedling" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="AI"
        options={{
          headerShown: false,
          title: "IA",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "sparkles" : "sparkles-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "person-fill" : "person"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default CoreLayout;
