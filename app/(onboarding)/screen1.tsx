// app/(onboarding)/screen1.tsx
import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";

export default function Screen1() {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/(onboarding)/screen2")}
    >
      <ImageBackground
        source={require("../../assets/onboarding/screen1.png")}
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
