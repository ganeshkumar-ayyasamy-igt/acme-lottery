// BallBase.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import { colors } from "../../theme/Colors";
import { spacing } from "../../theme/Spacing";

interface BallBaseProps {
  label: string | number;
  size: number;
  isTouchable?: boolean;
  isSelected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const BallBase = ({
  label,
  size,
  isTouchable = false,
  isSelected = false,
  onPress,
}: BallBaseProps) => {
  const content = (
    <Text
      style={[
        isSelected ? styles.touchText : styles.text,
        { fontSize: size * 0.4 },
      ]}
    >
      {label}
    </Text>
  );

  const ballStyle = [
    styles.ball,
    { width: size, height: size, borderRadius: size / 2 },
    isTouchable && styles.touchBall,
    isSelected && styles.selectedBall,
  ];

  if (isTouchable) {
    return (
      <TouchableOpacity style={ballStyle} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={ballStyle}>{content}</View>;
};

export default BallBase;

const styles = StyleSheet.create({
  ball: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  touchBall: {
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  text: {
    color: colors.text,
    fontWeight: "bold",
  },
  selectedBall: {
    backgroundColor: colors.text,
  },
  touchText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
