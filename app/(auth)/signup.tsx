// app/(auth)/signup.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Greška", "Popuni sva polja.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Greška", "Lozinke se ne poklapaju.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Greška", "Lozinka mora imati bar 6 karaktera.");
      return;
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password);
      // Ako uspe, vodi korisnika na main/home
      router.replace("/(main)/home");
    } catch (error: any) {
      console.log("Sign up error:", error);
      let message = "Nešto je pošlo naopako.";

      if (error.code === "auth/email-already-in-use") {
        message = "Ovaj email je već registrovan.";
      } else if (error.code === "auth/invalid-email") {
        message = "Email adresa nije validna.";
      } else if (error.code === "auth/weak-password") {
        message = "Lozinka je preslaba.";
      }

      Alert.alert("Greška pri registraciji", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Napravi nalog</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Potvrdi lozinku"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Registruj se</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.linkText}>Već imaš nalog? Uloguj se</Text>
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
