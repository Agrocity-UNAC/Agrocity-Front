import { ChatActionButton } from "@/components/atoms/ChatActionButton";
import { ChatInput } from "@/components/atoms/ChatInput";
import { ImagePreview } from "@/components/atoms/ImagePreview";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface ChatInputBarProps {
  onSendMessage: (text: string) => void;
  onPickImage: () => void;
  onTakePhoto: () => void;
  onClearImage: () => void;
  imagePreview?: string | null;
  isLoading?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSendMessage,
  onPickImage,
  onTakePhoto,
  onClearImage,
  imagePreview,
  isLoading = false,
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() || imagePreview) {
      onSendMessage(text);
      setText("");
    }
  };

  const canSend = (text.trim().length > 0 || imagePreview) && !isLoading;

  return (
    <View style={styles.container}>
      {imagePreview && (
        <View style={styles.previewContainer}>
          <ImagePreview uri={imagePreview} onRemove={onClearImage} />
        </View>
      )}
      <View style={styles.inputContainer}>
        <ChatActionButton
          icon="camera-outline"
          onPress={onTakePhoto}
          disabled={isLoading}
        />
        <ChatActionButton
          icon="image-outline"
          onPress={onPickImage}
          disabled={isLoading}
        />
        <ChatInput value={text} onChangeText={setText} editable={!isLoading} />
        <ChatActionButton
          icon="send"
          onPress={handleSend}
          disabled={!canSend}
          color={canSend ? "#4CAF50" : "#ccc"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 8,
  },
  previewContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
