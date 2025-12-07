import { MaterialIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Screen1() {
  return (
    <View style={styles.container}>

      <View style={styles.fakeCircle}>
        <View style={styles.leftSide}>
          <Text style={styles.name}>Messi</Text>
          <Text style={styles.percent}>45%</Text>
          <Text style={styles.votes}>10 glasova</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSide}>
          <Text style={[styles.name, styles.nameA]}>Ronaldo</Text>
          <Text style={[styles.percent, styles.percentA]}>55%</Text>
          <Text style={[styles.votes, styles.votesA]}>12 glasova</Text>
        </View>
      </View>
      <View style={styles.fakeCircleBellow}></View>
 
      <View style={styles.textWrapper}>
        <Text style={styles.smallText}>ovo nije aplikacija….</Text>
        <Text style={styles.bigText}>Ovo je ARENA!</Text>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.active]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <Pressable
        style={styles.next_btn}
        onPress={() => router.push("/(onboarding)/screen2")}
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
    top: -60,
    alignSelf: "center",
    width: 500,
    height: 450,
    borderBottomLeftRadius: 400,
    backgroundColor: "#030412",
    flexDirection: "row",
    overflow: "hidden",
    zIndex: 1,
  },
  fakeCircleBellow: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    width: 500,
    height: 450,
    borderBottomLeftRadius: 350,
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
  },

  rightSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 50
  },

  divider: {
    width: 1,
    left: -5,
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
    fontSize: 24
  },

  percentA: {
    fontSize: 32
  },

  votesA: {
    fontSize: 18
  },

  textWrapper: {
    paddingHorizontal: 32,
    paddingBottom: 50,
  },

  smallText: {
    color: "#FFE66D",
    fontSize: 14,
    marginBottom: 10,
  },

  bigText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 60,
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
