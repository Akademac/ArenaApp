import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

type Side = "left" | "right";

type Comment = {
  id: string;
  user: string;
  country: string;
  text: string;
  side: Side; // kojoj strani pripada autor
  repliesOpposite: number; // koliko ima suprotnih odgovora
};

const DUMMY_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "Marko",
    country: "🇷🇸",
    text: "Messi je klasa iznad svih.",
    side: "left",
    repliesOpposite: 10,
  },
  {
    id: "2",
    user: "Hans",
    country: "🇩🇪",
    text: "Ronaldo ima mentalitet pobednika.",
    side: "right",
    repliesOpposite: 3,
  },
  {
    id: "3",
    user: "Ana",
    country: "🇭🇷",
    text: "Messi je čist talenat, bez forsiranja.",
    side: "left",
    repliesOpposite: 0,
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  leftLabel: string;
  rightLabel: string;
};

export default function CommentsBottomSheet({
  visible,
  onClose,
  leftLabel,
  rightLabel,
}: Props) {
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [input, setInput] = useState("");

  const renderItem = ({ item }: { item: Comment }) => {
    const isLeft = item.side === "left";

    return (
      <View
        style={[
          styles.commentCard,
          isLeft ? styles.leftComment : styles.rightComment,
        ]}
      >
        {/* OPSADA */}
        {item.repliesOpposite >= 5 && (
          <Text style={styles.underAttack}>⚔ KOMENTAR POD OPSADOM</Text>
        )}

        {/* USER */}
        <Text style={styles.userLine}>
          {item.country} {item.user}
        </Text>

        {/* TEXT */}
        <Text style={styles.commentText}>{item.text}</Text>

        {/* OPPOSITE REPLIES */}
        {item.repliesOpposite > 0 && (
          <Pressable style={styles.oppositeBox}>
            <Text style={styles.oppositeText}>
              {item.repliesOpposite} odgovora sa suprotne strane ▸
            </Text>
          </Pressable>
        )}

        {/* REPLY BUTTON */}
        <Pressable onPress={() => setReplyTo(item)}>
          <Text style={styles.replyBtn}>Odgovori</Text>
        </Pressable>
      </View>
    );
  };

  const quotedText = useMemo(() => {
    if (!replyTo) return null;
    return `↪ ${replyTo.user}: "${replyTo.text}"`;
  }, [replyTo]);
  

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          {/* HANDLE */}
          <View style={styles.handle} />

          {/* HEADER */}
          <Text style={styles.title}>Komentari – Arena Duel</Text>
          <Text style={styles.subtitle}>
            {leftLabel} vs {rightLabel}
          </Text>

          {/* FEED */}
          <FlatList
            data={DUMMY_COMMENTS}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />

          {/* INPUT */}
          <View style={styles.inputBox}>
            {replyTo && (
              <View style={styles.replyPreview}>
                <Text style={styles.replyPreviewText}>{quotedText}</Text>
                <Pressable onPress={() => setReplyTo(null)}>
                  <Text style={styles.cancelReply}>✕</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.inputRow}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Napiši svoj komentar..."
                placeholderTextColor="#999"
                style={styles.input}
              />
              <Pressable style={styles.sendBtn}>
                <Text style={styles.sendText}>Pošalji</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* ================= STYLES ================= */

const LEFT_COLOR = "#2F80ED";
const RIGHT_COLOR = "#EB5757";
const YELLOW = "#FFE66D";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  backdrop: {
    flex: 1,
  },

  sheet: {
    height: height * 0.65,
    backgroundColor: "#0d1117",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  handle: {
    width: 50,
    height: 5,
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: "#444",
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: YELLOW,
    textAlign: "center",
    marginBottom: 12,
  },

  commentCard: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },

  leftComment: {
    backgroundColor: "rgba(47,128,237,0.15)",
    alignSelf: "flex-start",
  },

  rightComment: {
    backgroundColor: "rgba(235,87,87,0.15)",
    alignSelf: "flex-end",
  },

  underAttack: {
    color: YELLOW,
    fontWeight: "800",
    marginBottom: 4,
    fontSize: 12,
  },

  userLine: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ddd",
    marginBottom: 4,
  },

  commentText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
  },

  oppositeBox: {
    marginBottom: 6,
  },

  oppositeText: {
    fontSize: 12,
    color: YELLOW,
  },

  replyBtn: {
    fontSize: 12,
    color: "#9BA4B4",
    textAlign: "right",
  },

  inputBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "#0d1117",
    borderTopWidth: 1,
    borderColor: "#222",
  },

  replyPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  replyPreviewText: {
    fontSize: 12,
    color: YELLOW,
    flex: 1,
  },

  cancelReply: {
    color: "#fff",
    marginLeft: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#050816",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 14,
  },

  sendBtn: {
    backgroundColor: YELLOW,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },

  sendText: {
    color: "#000",
    fontWeight: "800",
  },
});
