import { ChatInputBar } from "@/components/molecules/ChatInputBar";
import { MessageList } from "@/components/molecules/MessageList";
import { useChatbot } from "@/hooks/useChatbot";
import { useChatStore } from "@/stores/chatStore";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export const ChatbotView: React.FC = () => {
  const { messages, isLoading } = useChatStore();
  const { sendMessage, pickImage, takePhoto, clearImage, imagePreview } =
    useChatbot();
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height,
          duration: e.duration || 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      (e) => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: e.duration || 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  return (
    <View style={styles.container}>
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInputBar
        onSendMessage={sendMessage}
        onPickImage={pickImage}
        onTakePhoto={takePhoto}
        onClearImage={clearImage}
        imagePreview={imagePreview}
        isLoading={isLoading}
      />
      <Animated.View style={{ height: keyboardHeight }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
