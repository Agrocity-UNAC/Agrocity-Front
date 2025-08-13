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
import { useRegisterForm } from "../../hooks/useRegisterForm";

const Register = () => {
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    isLoading,
    error,
    isFormValid,
  } = useRegisterForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoToLogin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.replace("/inicio/login");
    });
  };

  const onSubmit = async () => {
    const validationError = await handleSubmit();
    if (validationError) {
      Alert.alert("Error de validación", validationError);
    }
  };

  // Mostrar error si existe
  React.useEffect(() => {
    if (error) {
      Alert.alert("Error de registro", error, [
        {
          text: "Entendido",
          style: "default",
        },
      ]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      
      <View style={styles.cloud1} />
      <View style={styles.cloud2} />
      <View style={styles.cloud3} />
      <View style={styles.cloud4} />
      
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
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="leaf" style={styles.leafIcon} />
              </View>
            </View>

            <Text style={styles.welcomeText}>¡Bienvenido a AgroCity granjero!</Text>
            <Text style={styles.subtitle}>¡Inicia tu aventura en Agrocity!</Text>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="person" style={styles.labelIcon} />
                <Text style={styles.inputLabel}>Nombre de Granjero</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Introduce tu nombre"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="person-circle" style={styles.labelIcon} />
                <Text style={styles.inputLabel}>Nombre de usuario</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Introduce tu usuario"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="mail" style={styles.labelIcon} />
                <Text style={styles.inputLabel}>Correo</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
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
                  placeholder="Crea tu contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} style={styles.eyeIconStyle} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="lock-closed" style={styles.labelIcon} />
                <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} style={styles.eyeIconStyle} />
                </TouchableOpacity>
              </View>
              {password !== confirmPassword && confirmPassword.length > 0 && (
                <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.registerButton,
                (!isFormValid || isLoading) && styles.registerButtonDisabled,
              ]}
              onPress={onSubmit}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Ionicons name="heart" style={styles.buttonIcon} />
                  <Text style={styles.registerButtonText}>¡Comenzar a sembrar!</Text>
                  <Ionicons name="heart" style={styles.buttonIcon} />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya eres un granjero? </Text>
              <TouchableOpacity onPress={handleGoToLogin}>
                <Text style={styles.loginLink}>¡Inicia tu siembra!</Text>
              </TouchableOpacity>
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
    height: "75%",
    backgroundColor: "#87CEEB",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
    backgroundColor: "#90EE90", 
  },
  cloud1: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 70,
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 35,
  },
  cloud2: {
    position: "absolute",
    top: 100,
    right: 30,
    width: 90,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 45,
  },
  cloud3: {
    position: "absolute",
    top: 40,
    right: 120,
    width: 60,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 30,
  },
  cloud4: {
    position: "absolute",
    top: 80,
    left: 100,
    width: 50,
    height: 25,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
  },
  sun: {
    position: "absolute",
    top: 40,
    right: 60,
    width: 45,
    height: 45,
    backgroundColor: "#FFD700",
    borderRadius: 22.5,
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
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    marginTop: 100,
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 35,
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
    color: "#4CAF50",
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
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 8,
    marginLeft: 5,
  },
  registerButton: {
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
  registerButtonDisabled: {
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
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  loginText: {
    fontSize: 15,
    color: "#2E7D32",
  },
  loginLink: {
    fontSize: 15,
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default Register;