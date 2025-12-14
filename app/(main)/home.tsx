import BottomActionBar from "@/components/BottomActionBar";
import CommentsBottomSheet from "@/components/CommentsBottomSheet";
import VoteCard from "@/components/VoteCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Duel = {
  id: string;
  leftLabel: string;
  rightLabel: string;
  votesLeft: number;
  votesRight: number;
};

const MOCK_TOPICS: Duel[] = [
  { id: "1", leftLabel: "Messi", rightLabel: "Ronaldo", votesLeft: 10, votesRight: 12 },
  { id: "2", leftLabel: "Coca-Cola", rightLabel: "Pepsi", votesLeft: 5, votesRight: 8 },
  { id: "3", leftLabel: "iPhone", rightLabel: "Samsung", votesLeft: 30, votesRight: 20 },
  { id: "4", leftLabel: "Donald Trump", rightLabel: "Vladimir Vladimirovič Putin", votesLeft: 30, votesRight: 20 },
];

type ActiveTab =
  | "comments"
  | "regions"
  | "trending"
  | "profile"
  | "share"
  | null;

export default function HomeScreen() {
  const [showDescription, setShowDescription] = useState(false);
  const sheetTranslateY = useRef(new Animated.Value(40)).current;

  // ✅ COMMENTS
  const [showComments, setShowComments] = useState(false);

  const [activeFeed, setActiveFeed] = useState<"random" | "personal" | "popular">("random");
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const [currentTopicId, setCurrentTopicId] = useState<string | null>(
    MOCK_TOPICS[0]?.id ?? null
  );

  // ✅ RESET DONJEG BARA NA PROMENU TEME
  useEffect(() => {
    setActiveTab(null);
  }, [currentTopicId]);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / SCREEN_HEIGHT);
    const topic = MOCK_TOPICS[index];
    if (topic) setCurrentTopicId(topic.id);
  };

  useEffect(() => {
    if (showDescription) {
      sheetTranslateY.setValue(40);
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 6,
        tension: 40,
      }).start();
    }
  }, [showDescription, sheetTranslateY]);

  const currentDuel =
    MOCK_TOPICS.find((t) => t.id === currentTopicId) ?? MOCK_TOPICS[0];

  // ✅ SHARE
  const handleShare = async () => {
    if (!currentDuel) return;
    setActiveTab("share");
    try {
      await Share.share({
        message: `Glasaj u Areni: ${currentDuel.leftLabel} vs ${currentDuel.rightLabel} 🔥`,
      });
    } catch (error) {
      console.log("Share error", error);
    }
  };

  // ✅ FAVORITE
  const isCurrentFavorite = currentTopicId ? !!favorites[currentTopicId] : false;

  const toggleFavoriteForCurrent = () => {
    if (!currentTopicId) return;
    setFavorites((prev) => ({
      ...prev,
      [currentTopicId]: !prev[currentTopicId],
    }));
  };

  // ✅ PROFILE
  const handleProfilePress = () => {
    setActiveTab("profile");
    router.push("/(main)/profile");
  };

  // ✅ REGIONS
  const hadleRegions = () => {
    setActiveTab("regions");
    router.push("/(main)/regions");
  };

  return (
    <View style={styles.container}>
      {/* OPIS */}
      {!showDescription && (
        <Pressable style={styles.infoIcon} onPress={() => setShowDescription(true)}>
          <Text style={{ color: "#fff", fontSize: 14 }}>...</Text>
        </Pressable>
      )}

      {/* PROFIL */}
      <Pressable onPress={handleProfilePress} style={styles.profileIconButton}>
        <Ionicons
          name="person-outline"
          size={26}
          color={activeTab === "profile" ? "#FFE66D" : "#9BA4B4"}
        />
      </Pressable>

      {/* TOP MODES */}
      <View style={styles.topModesWrapper}>
        {["random", "personal", "popular"].map((mode) => (
          <Pressable key={mode} onPress={() => setActiveFeed(mode as any)} style={styles.modeButton}>
            <Ionicons
              name={
                mode === "random"
                  ? "shuffle-outline"
                  : mode === "personal"
                  ? "rocket-outline"
                  : "flame-outline"
              }
              size={22}
              color={activeFeed === mode ? "#FFE66D" : "#9BA4B4"}
            />
            <Text
              style={[
                styles.modeText,
                activeFeed === mode && styles.modeTextActive,
              ]}
            >
              {mode === "random" ? "Random" : mode === "personal" ? "For You" : "Popular"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* FEED */}
      <FlatList
        data={MOCK_TOPICS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ height: SCREEN_HEIGHT }}>
            <VoteCard
              leftLabel={item.leftLabel}
              rightLabel={item.rightLabel}
              initialVotesLeft={item.votesLeft}
              initialVotesRight={item.votesRight}
            />
          </View>
        )}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      {/* DONJI BAR */}
      <BottomActionBar
        onShare={handleShare}
        activeTab={activeTab}
        isFavorite={isCurrentFavorite}
        onCommentsPress={() => {
          setActiveTab("comments");
          setShowComments(true);
        }}
        onRegionsPress={hadleRegions}
        onTrendingPress={() => setActiveTab("trending")}
        onToggleFavorite={toggleFavoriteForCurrent}
      />

      {/* ✅ COMMENTS BOTTOM SHEET */}
      <CommentsBottomSheet
        visible={showComments}
        onClose={() => {
          setShowComments(false);
          setActiveTab(null);
        }}
        leftLabel={currentDuel.leftLabel}
        rightLabel={currentDuel.rightLabel}
      />

      {/* DESCRIPTION MODAL */}
      {showDescription && (
        <View style={styles.sheetOverlay}>
          <Pressable
            style={styles.sheetBackground}
            onPress={() => setShowDescription(false)}
          />

          <Animated.View
            style={[
              styles.sheetContent,
              { transform: [{ translateY: sheetTranslateY }] },
            ]}
          >
            <View style={{ width: "100%", alignItems: "center", marginBottom: 10 }}>
              <View style={styles.sheetHandle} />
            </View>

            <Text style={styles.sheetTitle}>Opis debate</Text>
            <Text style={styles.sheetText}>
              {currentDuel
                ? `${currentDuel.leftLabel} vs ${currentDuel.rightLabel}`
                : "Nema dodatog opisa."}
            </Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050816" },

  infoIcon: {
    position: "absolute",
    top: 49,
    left: 10,
    zIndex: 60,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  profileIconButton: {
    position: "absolute",
    top: 40,
    right: 16,
    zIndex: 60,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  topModesWrapper: {
    position: "absolute",
    top: 49,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    zIndex: 50,
  },

  modeButton: { alignItems: "center" },
  modeText: { fontSize: 11, color: "#9BA4B4", marginTop: 2 },
  modeTextActive: { color: "#FFE66D", fontWeight: "700" },

  sheetOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 999,
  },

  sheetBackground: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },

  sheetContent: {
    width: "100%",
    backgroundColor: "#0d1117",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 22,
    minHeight: "28%",
  },

  sheetHandle: { width: 50, height: 5, borderRadius: 999, backgroundColor: "#444" },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },

  sheetText: { fontSize: 15, color: "#d1d5db", lineHeight: 21, textAlign: "center" },
});
