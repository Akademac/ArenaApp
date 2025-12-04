// hooks/usePreVotePulse.ts
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const usePreVotePulse = (enabled: boolean) => {
  const scale = useRef(new Animated.Value(1)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (enabled) {
      // kreni loop ako već nije krenuo
      if (!loopRef.current) {
        loopRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.03,
              duration: 750,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 750,
              useNativeDriver: true,
            }),
          ])
        );
      }

      loopRef.current.start();
    } else {
      // stop ako je user glasao
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current = null;
      }
      scale.setValue(1); // vrati na normalu
    }

    return () => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current = null;
      }
    };
  }, [enabled, scale]);

  return scale;
};
