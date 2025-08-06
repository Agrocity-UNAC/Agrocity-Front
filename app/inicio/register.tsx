import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log("Register:", { nombre, username, email, password, confirmPassword });
    router.replace("/home");
  };

  const handleGoToLogin = () => {
    router.replace("/inicio/login");
  };

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
            <Image source={require("../../assets/images/LogoAgrocity.png")} style={styles.logo} />
          </View>

          <Text style={styles.welcomeText}>¡Únete a Agrocity!</Text>
          <Text style={styles.subtitle}>Crea tu cuenta para empezar</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Nombre completo" 
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre de usuario</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Tu nombre de usuario" 
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Usuario</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="tucorreo@email.com" 
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Crea una contraseña" 
                placeholderTextColor="#999"
                secureTextEntry 
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Confirma tu contraseña" 
                placeholderTextColor="#999"
                secureTextEntry 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={styles.loginLink}>Iniciar sesión aquí</Text>
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
    padding: 25,
    paddingTop: 40,
    paddingBottom: 40,
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
    width: 150,
    height: 130,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "semibold",
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