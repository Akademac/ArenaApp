import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Signup() {
  const { signUp, loading, user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirm) {
      alert("Popuni sva polja");
      return;
    }

    if (password !== confirm) {
      alert("Lozinke se ne poklapaju");
      return;
    }

    if (password.length < 6) {
      alert("Lozinka mora imati bar 6 karaktera");
      return;
    }

    try {
      await signUp(email, password);

      // ✅ kad se user automatski setuje kroz onAuthStateChanged
      // možemo direktno na home
      router.replace("/(main)/home");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGuest = () => {
    router.replace("/(main)/home");
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>Napravi profil</Text>
      <Text style={styles.subtitle}>
        Napravi profil vrlo brzo i kreni sa glasanjem
      </Text>

      {/* USERNAME */}
      <Text style={styles.label}>Ime korisnika</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Your name"
        placeholderTextColor="#9BA4B4"
        style={styles.input}
      />

      {/* EMAIL */}
      <Text style={styles.label}>Lozinka</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="hello@email.com"
        placeholderTextColor="#9BA4B4"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Napravi Lozinku</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          placeholderTextColor="#9BA4B4"
          style={styles.passwordInput}
          secureTextEntry={!showPass}
        />
        <Pressable onPress={() => setShowPass(!showPass)}>
          <Ionicons
            name={showPass ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#9BA4B4"
          />
        </Pressable>
      </View>
      <Text style={styles.helper}>Lozika mora sadrzati najmanje 8 karaktera</Text>

      {/* CONFIRM */}
      <Text style={styles.label}>Ponovi Lozinku</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="********"
          placeholderTextColor="#9BA4B4"
          style={styles.passwordInput}
          secureTextEntry={!showConfirm}
        />
        <Pressable onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons
            name={showConfirm ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#9BA4B4"
          />
        </Pressable>
      </View>
      <Text style={styles.helper}>Lozinka mora sadrzati najmanje 8 karaktera</Text>

      {/* SIGNUP BUTTON */}
      <Pressable
        style={[styles.signupButton, loading && { opacity: 0.5 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </Pressable>

      {/* GUEST */}
      <Pressable onPress={handleGuest}>
        <Text style={styles.guestText}>Nastavi kao gost</Text>
      </Pressable>

      {/* LOGIN */}
      <Pressable onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.loginText}>
          Vec imate profil? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    color: "#9BA4B4",
    fontSize: 14,
    marginBottom: 36,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#1F2933",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
    backgroundColor: "#030412",
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F2933",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#030412",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },

  helper: {
    fontSize: 12,
    color: "#9BA4B4",
    marginTop: 4,
  },

  signupButton: {
    marginTop: 32,
    backgroundColor: "#1DA1F2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#1DA1F2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  signupText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  guestText: {
    color: "#FFE66D",
    textAlign: "center",
    marginTop: 18,
    fontWeight: "600",
  },

  loginText: {
    color: "#9BA4B4",
    textAlign: "center",
    marginTop: 22,
    fontSize: 13,
  },

  loginLink: {
    color: "#1DA1F2",
    fontWeight: "700",
  },
});
