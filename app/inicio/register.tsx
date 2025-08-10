import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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

  const handleGoToLogin = () => {
    router.replace("/inicio/login");
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/LogoAgrocity.png")}
              style={styles.logo}
            />
          </View>

          <Text style={styles.welcomeText}>¡Únete a Agrocity!</Text>
          <Text style={styles.subtitle}>Crea tu cuenta para comenzar</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <View
              style={[styles.inputWrapper, error && styles.inputWrapperError]}
            >
              <Ionicons name="person" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View
              style={[styles.inputWrapper, error && styles.inputWrapperError]}
            >
              <Ionicons name="mail" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View
              style={[styles.inputWrapper, error && styles.inputWrapperError]}
            >
              <Ionicons name="lock-closed" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Crea una contraseña"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar contraseña</Text>
            <View
              style={[
                styles.inputWrapper,
                error && styles.inputWrapperError,
                password !== confirmPassword &&
                  confirmPassword.length > 0 &&
                  styles.inputWrapperError,
              ]}
            >
              <Ionicons name="lock-closed" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isLoading}
              />
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
              <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={styles.loginLink}>Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaffea",
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
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 100,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 15,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#4ADE80",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    height: 45,
  },
  inputWrapperError: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
    color: "#48A86B",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 5,
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default Register;
