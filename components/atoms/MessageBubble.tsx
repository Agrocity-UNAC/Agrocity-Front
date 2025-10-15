import { ChatMessage } from "@/types/ChatMessage";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface MessageBubbleProps {
  message: ChatMessage;
}

// Función para parsear y renderizar markdown simple
const parseMarkdown = (text: string, baseStyle: any) => {
  const parts: React.ReactNode[] = [];
  let key = 0;

  // Dividir por saltos de línea
  const lines = text.split("\n");

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      parts.push(<Text key={`br-${key++}`}>{"\n"}</Text>);
    }

    // Regex para capturar texto en negrita (**texto** o __texto__)
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    // Regex para capturar texto en cursiva (*texto* o _texto_)
    const italicRegex = /(\*|_)(.*?)\1/g;

    let lastIndex = 0;
    const segments: {
      text: string;
      bold?: boolean;
      italic?: boolean;
      start: number;
      end: number;
    }[] = [];

    // Encontrar todas las negritas
    let match;
    while ((match = boldRegex.exec(line)) !== null) {
      segments.push({
        text: match[2],
        bold: true,
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    // Encontrar todas las cursivas (que no estén dentro de negritas)
    boldRegex.lastIndex = 0;
    while ((match = italicRegex.exec(line)) !== null) {
      // Verificar que no sea parte de una negrita (**)
      if (
        line[match.index - 1] !== "*" &&
        line[match.index + match[0].length] !== "*"
      ) {
        segments.push({
          text: match[2],
          italic: true,
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    }

    // Ordenar segmentos por posición
    segments.sort((a, b) => a.start - b.start);

    // Renderizar los segmentos
    if (segments.length === 0) {
      parts.push(<Text key={`text-${key++}`}>{line}</Text>);
    } else {
      segments.forEach((segment, i) => {
        // Agregar texto antes del segmento
        if (segment.start > lastIndex) {
          parts.push(
            <Text key={`text-${key++}`}>
              {line.substring(lastIndex, segment.start)}
            </Text>
          );
        }

        // Agregar el segmento con formato
        if (segment.bold) {
          parts.push(
            <Text key={`bold-${key++}`} style={styles.boldText}>
              {segment.text}
            </Text>
          );
        } else if (segment.italic) {
          parts.push(
            <Text key={`italic-${key++}`} style={styles.italicText}>
              {segment.text}
            </Text>
          );
        }

        lastIndex = segment.end;
      });

      // Agregar texto después del último segmento
      if (lastIndex < line.length) {
        parts.push(
          <Text key={`text-${key++}`}>{line.substring(lastIndex)}</Text>
        );
      }
    }
  });

  return <Text style={baseStyle}>{parts}</Text>;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        {message.image && (
          <Image
            source={{ uri: message.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        {message.text && (
          <>
            {isUser ? (
              <Text style={[styles.text, styles.userText]}>{message.text}</Text>
            ) : (
              parseMarkdown(message.text, [styles.text, styles.aiText])
            )}
          </>
        )}
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  aiContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: "#4CAF50",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#333",
    fontSize: 16,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  italicText: {
    fontStyle: "italic",
    color: "#333",
  },
  codeText: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
    color: "#d63384",
  },
  codeBlock: {
    fontFamily: "monospace",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.4)",
    marginTop: 4,
    textAlign: "right",
  },
});
