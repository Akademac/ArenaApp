import BottomActionBar from "@/components/BottomActionBar";
import VoteCard from "@/components/VoteCard";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Share,
  StyleSheet,
  View
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
  {
    id: "1",
    leftLabel: "Messi",
    rightLabel: "Ronaldo",
    votesLeft: 10,
    votesRight: 12,
  },
  {
    id: "2",
    leftLabel: "Coca-Cola",
    rightLabel: "Pepsi",
    votesLeft: 5,
    votesRight: 8,
  },
  {
    id: "3",
    leftLabel: "iPhone",
    rightLabel: "Samsung",
    votesLeft: 30,
    votesRight: 20,
  },
  {
    id: "4",
    leftLabel: "Donald Trump",
    rightLabel: "Vladimir Vladimirovič Putin",
    votesLeft: 30,
    votesRight: 20,
  },
];

type ActiveTab = "comments" | "regions" | "trending" | "profile" | "share" | null;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  // ⭐ favorites po topic id-u
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // koji topic je trenutno na ekranu (po y scroll-u)
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(
    MOCK_TOPICS[0]?.id ?? null
  );

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / SCREEN_HEIGHT);
    const topic = MOCK_TOPICS[index];
    if (topic) {
      setCurrentTopicId(topic.id);
    }
  };

  const onProfilePress = () => {
    console.log('On profile press!')
  }

  // 👇 ovde hvatamo PRAVI current duel
  
  const currentDuel =
    MOCK_TOPICS.find((t) => t.id === currentTopicId) ?? MOCK_TOPICS[0];
  
    //share function

  const handleShare = async () => {
    if (!currentDuel) return;
    setActiveTab('share')
    try {
      await Share.share({
        message: `Glasaj u Areni: ${currentDuel.leftLabel} vs ${currentDuel.rightLabel} 🔥\n\n(Uskoro ovde ide pravi link ka duelu)`,
        // url: `https://arena.app/duel/${currentDuel.id}`, // kasnije backend/deep-link
      });
    } catch (error) {
      console.log("Share error", error);
    }
  };

  const isCurrentFavorite = currentTopicId
    ? !!favorites[currentTopicId]
    : false;

  const toggleFavoriteForCurrent = () => {
    if (!currentTopicId) return;
    setFavorites((prev) => ({
      ...prev,
      [currentTopicId]: !prev[currentTopicId],
    }));
  };

  const handleProfilePress = () => {
    // TODO: navigacija na profil,
    // npr. router.push('/profile') ili navigation.navigate('Profile')
    console.log("Go to profile");
  };

  return (
    <View style={styles.container}>
          {/* 👤 PROFIL */}
        <Pressable onPress={() => setActiveTab("profile")} style={styles.proflieIconButton}>
          <Ionicons
            name="person-outline"
            size={26}
           color={activeTab === "profile" ? "#FFE66D" : "#9BA4B4"}
          />
        </Pressable>

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
              // description={...} // kad dodaš opis
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

      {/* 🔥 Donji bar kao na TikToku */}
      <BottomActionBar
        onShare={handleShare} // 👈 sada share živi ovde
        activeTab={activeTab}
        isFavorite={isCurrentFavorite}
        onCommentsPress={() => {
          setActiveTab("comments");
          // TODO: otvoriš bottom sheet za komentare
        }}
        onRegionsPress={() => {
          setActiveTab("regions");
        }}
        onTrendingPress={() => {
          setActiveTab("trending");
        }}
        onToggleFavorite={toggleFavoriteForCurrent}
        // 🚫 više ne šaljemo onProfilePress ovde
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },
  profileButton: {
    position: "absolute",
    top: 40, // prilagodi zavisno od status bara / SafeArea
    right: 16,
    zIndex: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  profileIcon: {
    fontSize: 16,
    color: "#fff",
  },
    proflieIconButton: {
    position: "absolute",
    top: 40, // prilagodi zavisno od status bara / SafeArea
    right: 16,
    zIndex: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,

  },
});
