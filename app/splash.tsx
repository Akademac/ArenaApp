// app/splash.tsx
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/(onboarding)/screen1");
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text style={styles.text}>Arena</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "black",
    justifyContent: "center", 
    alignItems: "center" 
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  text: { fontSize: 28, color: "white" }
});
