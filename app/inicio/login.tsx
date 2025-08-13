import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoginForm } from "../../hooks/useLoginForm";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  } = useLoginForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoToRegister = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.replace("/inicio/register");
    });
  };

  React.useEffect(() => {
    if (error) {
      Alert.alert("Error de inicio de sesión", error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      
      <View style={styles.cloud1} />
      <View style={styles.cloud2} />
      <View style={styles.cloud3} />
      
      <View style={styles.sun} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="leaf" style={styles.leafIcon} />
              </View>
            </View>

            <Text style={styles.appName}>Agrocity</Text>
            <Text style={styles.tagline}>Cuidando tus plantas</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="person" style={styles.labelIcon} />
                  <Text style={styles.inputLabel}>Nombre de Granjero</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Introduce tu nombre"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="lock-closed" style={styles.labelIcon} />
                  <Text style={styles.inputLabel}>Contraseña</Text>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Introduce tu contraseña"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons name={showPassword ? "eye-off" : "eye"} style={styles.eyeIconStyle} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <View style={styles.buttonContent}>
                    <Ionicons name="heart" style={styles.buttonIcon} />
                    <Text style={styles.loginButtonText}>¡Comenzar a sembrar!</Text>
                    <Ionicons name="heart" style={styles.buttonIcon} />
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿Nuevo granjero? </Text>
                <TouchableOpacity onPress={handleGoToRegister}>
                  <Text style={styles.registerLink}>¡Únete primero!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "70%",
    backgroundColor: "#87CEEB", 
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "#90EE90", 
  },
  cloud1: {
    position: "absolute",
    top: 80,
    left: 30,
    width: 60,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
  },
  cloud2: {
    position: "absolute",
    top: 120,
    right: 40,
    width: 80,
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 40,
  },
  cloud3: {
    position: "absolute",
    top: 60,
    right: 100,
    width: 50,
    height: 25,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 25,
  },
  sun: {
    position: "absolute",
    top: 50,
    right: 50,
    width: 40,
    height: 40,
    backgroundColor: "#FFD700",
    borderRadius: 20,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingVertical: 40,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    backgroundColor: "#F0F8F0", 
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  iconContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  leafIcon: {
    fontSize: 45,
    color: "#fff",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 35,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 25,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  labelIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#999",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  eyeIconStyle: {
    fontSize: 20,
    color: "#4CAF50",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    fontSize: 18,
    color: "#fff",
    marginHorizontal: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  registerText: {
    fontSize: 15,
    color: "#2E7D32",
  },
  registerLink: {
    fontSize: 15,
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default Login;