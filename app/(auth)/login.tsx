// app/(auth)/login.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

useEffect(() => {
    if (!loading && user) {
      router.replace("/(main)/home");
    }
  }, [loading, user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Greška", "Unesi email i lozinku.");
      return;
    }

    try {
      setLoadingBtn(true);
      await signIn(email.trim(), password);
      // Ako uspe, vodi na main/home
      router.replace("/(main)/home");
    } catch (error: any) {
      console.log("Login error:", error);
      console.log("Login error code:", error?.code);

      let message = "Nešto je pošlo naopako.";

      if (error.code === "auth/user-not-found") {
        message = "Nalog sa ovim emailom ne postoji.";
      } else if (error.code === "auth/wrong-password") {
        message = "Pogrešna lozinka.";
      } else if (error.code === "auth/invalid-email") {
        message = "Email adresa nije validna.";
      } else if (error.code === "auth/invalid-credential") {
        message = "Pogrešan email ili lozinka.";
      }

      Alert.alert("Greška pri logovanju", message);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uloguj se</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Lozinka"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Prijavi se</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.linkText}>Nemaš nalog? Registruj se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#ffffff",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    marginTop: 16,
    textAlign: "center",
    color: "#9ca3af",
  },
});
