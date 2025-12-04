// app/(onboarding)/screen2.tsx
import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";

export default function Screen2() {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/(onboarding)/screen3")}
    >
      <ImageBackground
        source={require("../../assets/onboarding/screen2.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
