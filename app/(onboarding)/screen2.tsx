import { MaterialIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Screen1() {
  return (
    <View style={styles.container}>

      <View style={styles.fakeCircle}>
        <View style={styles.leftSide}>
          <Text style={[styles.name, styles.nameA]}>Samsung</Text>
          <Text style={[styles.percent, styles.percentA]}>75%</Text>
          <Text style={[styles.votes, styles.votesA]}>1500 glasova</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSide}>
          <Text style={styles.name}>iPhone</Text>
          <Text style={styles.percent}>25%</Text>
          <Text style={styles.votes}>500 glasova</Text>
        </View>
      </View>
      <View style={styles.fakeCircleBellow}></View>
 
      <View style={styles.textWrapper}>
        <Text style={styles.bigText}>Dobro razmisli!</Text>
        <Text style={styles.smallText}>imaces samo jednu priliku da glasas….</Text>

        <View style={styles.dots}>
          <View style={[styles.dot]} />
          <View style={[styles.dot, styles.active]} />
          <View style={styles.dot} />
        </View>
      </View>
      <Pressable
        style={styles.next_btn}
        onPress={() => router.push("/(onboarding)/screen3")}
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
    top: -40,
    alignSelf: "center",
    width: 500,
    height: 600,
    borderBottomLeftRadius: 600,
    backgroundColor: "#030412",
    flexDirection: "row",
    overflow: "hidden",
    zIndex: 1,
  },
  fakeCircleBellow: {
    position: "absolute",
    top: -55,
    alignSelf: "center",
    width: 500,
    height: 620,
    borderBottomLeftRadius: 450,
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
    paddingLeft: 100,
  },

  rightSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
  },

  divider: {
    width: 1,
    left: 50,
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
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 60,
  },

  bigText: {
    color: "#FFE66D",
    fontSize: 32,
    marginBottom: 10,
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
