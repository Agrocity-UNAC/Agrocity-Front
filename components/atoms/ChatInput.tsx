import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface ChatInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Escribe tu pregunta..."
      placeholderTextColor="#999"
      multiline
      maxLength={500}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    color: "#333",
  },
});
