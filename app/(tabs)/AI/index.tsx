import { ChatbotView } from "@/components/organisms/ChatbotView";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AiIndex = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ChatbotView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

export default AiIndex;
