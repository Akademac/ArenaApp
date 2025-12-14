import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { usePreVotePulse } from "../hooks/usePreVotePulse";

const MIN_SIDE = 0.3; // 30% min vizuelna širina jedne strane
const MAX_SIDE = 1 - MIN_SIDE; // 70% max vizuelna širina jedne strane

export type VoteCardProps = {
  leftLabel: string;
  rightLabel: string;
  initialVotesLeft: number;
  initialVotesRight: number;
  onVote?: (side: "left" | "right") => void;
  commentsCount?: number;
  onOpenComments?: () => void;
};

export default function VoteCard({
  leftLabel,
  rightLabel,
  initialVotesLeft,
  initialVotesRight,
  onVote,
  commentsCount,
  onOpenComments,
}: VoteCardProps) {
  const [votesLeft, setVotesLeft] = useState(initialVotesLeft);
  const [votesRight, setVotesRight] = useState(initialVotesRight);

  const [userChoice, setUserChoice] = useState<"left" | "right" | null>(null);

  const [previewSide, setPreviewSide] = useState<"left" | "right" | null>(null);
  const [ignoreNextPress, setIgnoreNextPress] = useState(false);

  const leftFlex = useRef(new Animated.Value(0.5)).current;
  const rightFlex = useRef(new Animated.Value(0.5)).current;

  // scale animacije za "attack" efekat
  const leftScale = useRef(new Animated.Value(1)).current;
  const rightScale = useRef(new Animated.Value(1)).current;

  const leftOpacity = useRef(new Animated.Value(1)).current;
  const rightOpacity = useRef(new Animated.Value(1)).current;
  const leftLoseScale = useRef(new Animated.Value(1)).current;
  const rightLoseScale = useRef(new Animated.Value(1)).current;

  const totalVotes = votesLeft + votesRight;

  const { leftPercent, rightPercent, visualLeft, visualRight } = useMemo(() => {
    if (totalVotes === 0) {
      return {
        leftPercent: 0.5,
        rightPercent: 0.5,
        visualLeft: 0.5,
        visualRight: 0.5,
      };
    }

    const rawLeft = votesLeft / totalVotes;
    const rawRight = votesRight / totalVotes;

    // clamp(meaning???) vizuelnih širina
    let visualLeft = rawLeft;
    if (visualLeft < MIN_SIDE) visualLeft = MIN_SIDE;
    if (visualLeft > MAX_SIDE) visualLeft = MAX_SIDE;
    const visualRight = 1 - visualLeft;

    return {
      leftPercent: rawLeft,
      rightPercent: rawRight,
      visualLeft,
      visualRight,
    };
  }, [votesLeft, votesRight, totalVotes]);

  // animacija prelaska na nove vizuelne širine (clamped)
  useEffect(() => {
    Animated.timing(leftFlex, {
      toValue: visualLeft,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(rightFlex, {
      toValue: visualRight,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visualLeft, visualRight, leftFlex, rightFlex]);
  //description modal effect

  // da li je strana vizuelno "zgusnuta"
  const leftCompressed = visualLeft <= MIN_SIDE + 0.02 && totalVotes > 0;
  const rightCompressed = visualRight <= MIN_SIDE + 0.02 && totalVotes > 0;

  const handleVote = (side: "left" | "right") => {
    if (userChoice !== null) return;
    if (side === "left") {
      // desna je poražena
      Animated.timing(rightOpacity, {
        toValue: 0.55,
        duration: 220,
        useNativeDriver: true,
      }).start();
      Animated.spring(rightLoseScale, {
        toValue: 0.92,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(leftOpacity, {
        toValue: 0.55,
        duration: 220,
        useNativeDriver: true,
      }).start();
      Animated.spring(leftLoseScale, {
        toValue: 0.92,
        useNativeDriver: true,
      }).start();
    }
    if (userChoice) return; // već glasao (gasiti radi vise klikova)

    if (side === "left") {
      setVotesLeft((v) => v + 1);
    } else {
      setVotesRight((v) => v + 1);
    }

    setUserChoice(side);
    onVote?.(side);

    // attack animacija za pobedničku stranu (scale burst)
    const targetScale = side === "left" ? leftScale : rightScale;

    Animated.sequence([
      Animated.timing(targetScale, {
        toValue: 1.3,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.spring(targetScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // pre-vote pulsiranje cele kartice
  const hasVoted = userChoice !== null;
  const cardScale = usePreVotePulse(!hasVoted);

  return (
    <View style={styles.container}>
      {/* ℹ️ INFO BUTTON */}

      <Animated.View
        style={[styles.duelContainer, { transform: [{ scale: cardScale }] }]}
      >
        {/* LEFT */}
        <Animated.View style={[styles.sideContainer, { flex: leftFlex }]}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ scale: leftScale }, { scale: leftLoseScale }],
              opacity: leftOpacity,
            }}
          >
            <Pressable
              onPress={() => {
                if (ignoreNextPress) {
                  setIgnoreNextPress(false);
                  return; // NE glasamo posle long press-a
                }
                handleVote("left");
                if (userChoice !== null) {
                  return; // ✅ već glasao – ne radi ništa
                }
              }}
              onLongPress={() => {
                setPreviewSide("left"); // 👈 uvek otvaramo preview na long press
                setIgnoreNextPress(true); // sledeći onPress ne sme da glasa
              }}
              delayLongPress={300}
              style={[
                styles.pressableSide,
                userChoice === "left" && styles.selectedSide,
                leftCompressed && styles.compressedSidePadding,
              ]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  leftCompressed && styles.optionLabelSmall,
                ]}
                numberOfLines={leftCompressed ? 1 : 2}
                ellipsizeMode="tail"
              >
                {leftLabel}
              </Text>

              <Text style={styles.percentage}>
                {Math.round(leftPercent * 100)}%
              </Text>

              <Text style={styles.votes}>{votesLeft} glasova</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* RIGHT */}
        <Animated.View style={[styles.sideContainer, { flex: rightFlex }]}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ scale: rightScale }, { scale: rightLoseScale }],
              opacity: rightOpacity,
            }}
          >
            <Pressable
              onPress={() => {
                if (ignoreNextPress) {
                  setIgnoreNextPress(false);
                  return;
                }
                if (userChoice !== null) {
                  return; // ✅ već glasao – ne radi ništa
                }
                handleVote("right");
              }}
              onLongPress={() => {
                setPreviewSide("right");
                setIgnoreNextPress(true);
              }}
              delayLongPress={300}
              style={[
                styles.pressableSide,
                userChoice === "right" && styles.selectedSide,
                rightCompressed && styles.compressedSidePadding,
              ]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  rightCompressed && styles.optionLabelSmall,
                ]}
                numberOfLines={rightCompressed ? 1 : 2}
                ellipsizeMode="tail"
              >
                {rightLabel}
              </Text>

              <Text style={styles.percentage}>
                {Math.round(rightPercent * 100)}%
              </Text>

              <Text style={styles.votes}>{votesRight} glasova</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      {/* PREVIEW OVERLAY ZA SKRAĆEN TEKST */}
      {previewSide && (
        <View style={styles.previewOverlay}>
          <Pressable
            style={styles.previewBackdrop}
            onPress={() => {
              setPreviewSide(null);
              setIgnoreNextPress(false); // 👈 resetujemo flag kad modal nestane
            }}
          />

          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>
              {previewSide === "left" ? leftLabel : rightLabel}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },
  duelContainer: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",

    borderColor: "#111827",
    backgroundColor: "#050816",
  },

  sideContainer: {
    height: "100%",
  },
  pressableSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  compressedSidePadding: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  selectedSide: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  divider: {
    width: 1,
    backgroundColor: "#111827",
  },
  optionLabel: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  optionLabelSmall: {
    fontSize: 18,
    marginBottom: 4,
  },
  percentage: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fbbf24",
  },
  votes: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },

  footerRow: {
    marginTop: 12,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  commentsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  commentsIcon: {
    fontSize: 16,
    marginRight: 6,
    color: "#e5e7eb",
  },
  commentsText: {
    fontSize: 14,
    color: "#e5e7eb",
  },
  commentIconContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0d1117",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },

  commentIcon: {
    fontSize: 18,
    color: "#9ca3af",
  },

  // preview overlay
  previewOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  previewBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  previewCard: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  previewTitle: {
    fontSize: 18,
    color: "#e5e7eb",
    textAlign: "center",
  },
});
