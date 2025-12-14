import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={34} color="#050816" />
        </View>

        <Text style={styles.name}>
          {user?.email?.split("@")[0] ?? "Arena User"}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* SEKCIJE */}
      <View style={styles.card}>
        <ProfileItem icon="options-outline" text="My Preferences" />
        <ProfileItem icon="star-outline" text="My Favorites" />
        <ProfileItem icon="stats-chart-outline" text="Voting Statistics" />
      </View>

      <View style={styles.card}>
        <ProfileItem icon="settings-outline" text="Settings" />
        <ProfileItem icon="help-circle-outline" text="Help & Support" />
        <ProfileItem icon="information-circle-outline" text="About Arena" />
      </View>

      {/* LOGOUT */}
      <Pressable style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

/* ✅ REUSABLE ITEM */
function ProfileItem({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <Pressable style={styles.item}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={20} color="#050816" />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#4FA3FF" />
    </Pressable>
  );
}

/* ✅ STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    paddingTop: 20
  },

  header: {
    alignItems: "center",
    paddingVertical: 40,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 999,
    backgroundColor: "#FFE66D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E3A8A", // ✅ plavi Arena ton
  },

  email: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  itemText: {
    fontSize: 15,
    color: "#050816",
  },

  logoutButton: {
    backgroundColor: "#050816",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },

  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
