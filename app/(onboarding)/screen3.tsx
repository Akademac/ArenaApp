import { MaterialIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Screen1() {
  return (
    <View style={styles.container}>
      <View style={styles.fakeCircle}>
        <View style={styles.leftSide}>
          <Text style={styles.name}>Pepsi</Text>
          <Text style={styles.percent}>16%</Text>
          <Text style={styles.votes}>400 glasova</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSide}>
          <Text style={[styles.name, styles.nameA]}>Coca-cola</Text>
          <Text style={[styles.percent, styles.percentA]}>84%</Text>
          <Text style={[styles.votes, styles.votesA]}>2100 glasova</Text>
        </View>
      </View>
      <View style={styles.fakeCircleBellow}></View>

      <View style={styles.textWrapper}>
        <Text style={styles.smallText}>Spremni?</Text>
        <Text style={styles.bigText}>
          ...hajde da konacno saznamo
        </Text>

        <View style={styles.dots}>
          <View style={[styles.dot]} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.active]} />
        </View>
      </View>
      <Pressable
        style={styles.next_btn}
        onPress={() => router.push("/(onboarding)/welcome")}
      >
        <MaterialIcons name="keyboard-arrow-right" size={34} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#112337",
    justifyContent: "flex-end",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  fakeCircle: {
    position: "absolute",
    top: -5,
    alignSelf: "center",
    width: 500,
    height: 650,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 800,
    backgroundColor: "#030412",
    flexDirection: "row",
    overflow: "hidden",
    zIndex: 1,
  },

  fakeCircleBellow: {
    position: "absolute",
    top: 19,
    alignSelf: "center",
    width: 500,
    height: 650,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 800,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
  },
  leftSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
    marginRight: 10
  },

  rightSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 120,
    paddingRight: 5
  },

  divider: {
    width: 1,
    left: -59,
    height: "100%",
    backgroundColor: "#132133",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },

  percent: {
    color: "#FFE66D",
    fontSize: 28,
    marginTop: 6,
    fontWeight: "700",
  },

  votes: {
    color: "#9BA4B4",
    marginTop: 4,
    fontSize: 14,
  },

  nameA: {
    fontSize: 24,
  },

  percentA: {
    fontSize: 32,
  },

  votesA: {
    fontSize: 18,
  },

  textWrapper: {
    paddingHorizontal: 32,
    paddingBottom: 50,
  },

  smallText: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
    color: "#FFE66D",

  },

  bigText: {
    color: "#FFFFFF",
    fontSize: 32,
    marginBottom: 40,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 50,
    height: 4,
    backgroundColor: "#3A4A5F",
    borderRadius: 4,
    marginRight: 8,
  },

  active: {
    backgroundColor: "#FFFFFF",
  },

  next_btn: {
    position: "absolute",
    right: 20,
    bottom: 50,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(29,161,242,0.92)",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",

    shadowColor: "#1DA1F2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,

    elevation: 10,
  },

  next_btn_txt: {
    color: "white",
    fontWeight: "700",
  },
});
