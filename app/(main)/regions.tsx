import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ✅ DUMMY TEMA
const TOPIC_TITLE = "Messi vs Ronaldo";

// ✅ DUMMY GLOBAL DATA
const GLOBAL_STATS = {
  leftLabel: "Messi",
  rightLabel: "Ronaldo",
  leftPercent: 54,
  rightPercent: 46,
  totalVotes: 12480,
};

// ✅ DUMMY COUNTRY DATA
const COUNTRY_STATS = [
  {
    code: "🇷🇸",
    name: "Serbia",
    left: 62,
    right: 38,
    total: 2338,
  },
  {
    code: "🇭🇷",
    name: "Croatia",
    left: 49,
    right: 51,
    total: 1253,
  },
  {
    code: "🇩🇪",
    name: "Germany",
    left: 33,
    right: 67,
    total: 2485,
  },
  {
    code: "🇺🇸",
    name: "USA",
    left: 71,
    right: 29,
    total: 4525,
  },
  {
    code: "🇧🇦",
    name: "Bosnia",
    left: 58,
    right: 42,
    total: 752,
  },
];

export default function RegionsStatsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#111" onPress={() => router.back()}/>
          </Pressable>

          <Text style={styles.headerTitle}>Po državama</Text>
        </View>

        <Text style={styles.topicTitle}>{TOPIC_TITLE}</Text>
        <View style={styles.yellowDivider} />

        {/* ✅ GLOBAL CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>GLOBALNO</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Messi</Text>
            <Text style={styles.percent}>{GLOBAL_STATS.leftPercent}%</Text>
          </View>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                { width: `${GLOBAL_STATS.leftPercent}%` },
              ]}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Ronaldo</Text>
            <Text style={styles.percent}>{GLOBAL_STATS.rightPercent}%</Text>
          </View>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                { width: `${GLOBAL_STATS.rightPercent}%` },
              ]}
            />
          </View>

          <Text style={styles.totalVotes}>
            Ukupno glasova:{" "}
            <Text style={styles.highlight}>{GLOBAL_STATS.totalVotes}</Text>
          </Text>
        </View>

        {/* ✅ COUNTRY CARDS */}
        {COUNTRY_STATS.map((country, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.countryTitle}>
              {country.code} {country.name.toUpperCase()}
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Messi</Text>
              <Text style={styles.percent}>{country.left}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${country.left}%` },
                ]}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ronaldo</Text>
              <Text style={styles.percent}>{country.right}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${country.right}%` },
                ]}
              />
            </View>

            <Text style={styles.countryTotal}>
              Ukupno iz ove države:{" "}
              <Text style={styles.highlight}>{country.total}</Text>
            </Text>
          </View>
        ))}

        {/* ✅ BOTTOM SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Ukupno glasova:{" "}
            <Text style={styles.highlight}>{GLOBAL_STATS.totalVotes}</Text>
          </Text>
          <Text style={styles.summaryText}>
            Broj država:{" "}
            <Text style={styles.highlight}>{COUNTRY_STATS.length}</Text>
          </Text>
          <Text style={styles.summaryText}>
            Najaktivnija država:{" "}
            <Text style={styles.highlight}>🇺🇸 USA</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ✅ BOJE I STILOVI – ARENA LIGHT + YELLOW ACCENT
const YELLOW = "#FFE66D";
const DARK = "#111";
const LIGHT_BG = "#F7FFF7";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    padding: 6,
    marginTop: 33

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: DARK,
    marginTop: 30
  },

  topicTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "800",
    color: YELLOW,
  },

  yellowDivider: {
    height: 2,
    backgroundColor: YELLOW,
    marginVertical: 12,
    borderRadius: 2,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
    color: DARK,
  },

  countryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  label: {
    fontSize: 14,
    color: DARK,
  },

  percent: {
    fontSize: 14,
    fontWeight: "800",
    color: YELLOW,
  },

  progressBg: {
    height: 10,
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: DARK,
    borderRadius: 20,
  },

  totalVotes: {
    marginTop: 6,
    fontSize: 13,
    color: "#444",
  },

  countryTotal: {
    marginTop: 6,
    fontSize: 13,
    color: "#444",
  },

  highlight: {
    color: YELLOW,
    fontWeight: "800",
  },

  summary: {
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
  },

  summaryText: {
    fontSize: 14,
    color: DARK,
    marginBottom: 6,
  },
});
