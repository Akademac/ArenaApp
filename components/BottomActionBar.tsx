import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ActiveTab = "comments" | "regions" | "trending" | "profile" | "share" | null;

type Props = {
  activeTab: ActiveTab;
  isFavorite: boolean;
  onCommentsPress: () => void;
  onRegionsPress: () => void;
  onTrendingPress: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
};

export default function BottomActionBar({
  activeTab,
  isFavorite,
  onCommentsPress,
  onRegionsPress,
  onTrendingPress,
  onToggleFavorite,
  onShare,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom + 8,
        },
      ]}
    >
      <View style={styles.inner}>
        {/* 💬 KOMENTARI */}
        <Pressable onPress={onCommentsPress} style={styles.iconButton}>
          <Ionicons
            name="chatbubble-outline"
            size={26}
            color={activeTab === "comments" ? "#FFE66D" : "#9BA4B4"}
          />
        </Pressable>

        {/* 🌍 REGIJE / DRŽAVE */}
        <Pressable onPress={onRegionsPress} style={styles.iconButton}>
          <Ionicons
            name="earth-outline"
            size={26}
            color={activeTab === "regions" ? "#FFE66D" : "#9BA4B4"}
          />
        </Pressable>

        {/* 📈 TRENDING */}
        <Pressable onPress={onTrendingPress} style={styles.iconButton}>
          <Ionicons
            name="trending-up-outline"
            size={26}
            color={activeTab === "trending" ? "#ffdd35ff" : "#9BA4B4"}
          />
        </Pressable>

        {/* ⭐ FAVORITE */}
        <Pressable onPress={onToggleFavorite} style={styles.iconButton}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={26}
            color={isFavorite ? "#ffd500ff" : "#9BA4B4"}
          />
        </Pressable>



        {/* ➡️ SHARE / NEXT */}
        <Pressable onPress={() => {
          onShare()
        }} style={styles.iconButton}>
          <Ionicons
            name="share-social-outline"
            size={26}
            color={activeTab === "share" ? "#FFE66D" : "#9BA4B4"}
          />
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
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#1F2933",
    backgroundColor: "#050816",
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  iconButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
