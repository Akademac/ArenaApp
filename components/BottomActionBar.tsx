// components/BottomActionBar.tsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ActiveTab = "comments" | "regions" | "trending" | "profile" | null;

type Props = {
  activeTab: ActiveTab;
  isFavorite: boolean;
  onCommentsPress: () => void;
  onRegionsPress: () => void;
  onTrendingPress: () => void;
  onToggleFavorite: () => void;
  onProfilePress: () => void;
  onShare: () => void;
};

export default function BottomActionBar({
  activeTab,
  isFavorite,
  onCommentsPress,
  onRegionsPress,
  onTrendingPress,
  onToggleFavorite,
  onProfilePress,
  onShare
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          // bar “leži” baš na dnu ekrana
          bottom: 0,
          // ukupna visina: visina safe area + naš bar
          paddingBottom: insets.bottom + 8,
        },
      ]}
    >
      <View style={styles.inner}>
        <Pressable onPress={onCommentsPress} style={styles.iconButton}>
          <Text
            style={[
              styles.icon,
              activeTab === "comments" && styles.iconActive,
            ]}
          >
            💬
          </Text>
        </Pressable>

        <Pressable onPress={onRegionsPress} style={styles.iconButton}>
          <Text
            style={[
              styles.icon,
              activeTab === "regions" && styles.iconActive,
            ]}
          >
            📊
          </Text>
        </Pressable>

        <Pressable onPress={onTrendingPress} style={styles.iconButton}>
          <Text
            style={[
              styles.icon,
              activeTab === "trending" && styles.iconActive,
            ]}
          >
            🔥
          </Text>
        </Pressable>

        <Pressable onPress={onToggleFavorite} style={styles.iconButton}>
          <Text
            style={[
              styles.icon,
              isFavorite && styles.favoriteActive,
            ]}
          >
            ⭐
          </Text>
        </Pressable>
          <Pressable onPress={onShare}>
        <Text style={styles.icon}>📤</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#1f2933",
    backgroundColor: "#020617",
    // veći bar, ikone će stajati gore
    paddingTop: 8,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // nema mnogo vertikalnog paddinga – time su ikone bliže vrhu
    paddingHorizontal: 12,
  },
  iconButton: {
    padding: 6,
  },
  icon: {
    fontSize: 22,
    color: "#6b7280",
  },
  iconActive: {
    color: "#ffffff",
  },
  favoriteActive: {
    color: "#facc15",
  },
});
