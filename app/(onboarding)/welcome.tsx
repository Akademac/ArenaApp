// app/(onboarding)/welcome.tsx
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spremni?</Text>
      <Text style={styles.subtitle}>Napravimo nalog ili nastavi kao gost.</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text style={styles.btnText}>Napravi nalog</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.btnText}>Uloguj se</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(main)/home")}
      >
        <Text style={styles.btnText}>Nastavi kao gost</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#566130",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 6, color: "white" },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 20,
    color: "white",
    fontWeight: "800",
  },
  btn: { margin: 5, borderColor: "white" },
  btnText: {
    color: "white",
  },
});
