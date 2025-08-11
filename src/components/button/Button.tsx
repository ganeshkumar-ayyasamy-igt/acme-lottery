// Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../../theme/Colors"; // adjust path if needed
import { spacing } from "../../theme/Spacing";
import { moderateScale } from "react-native-size-matters";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PRIMARY_COLOR = colors.primary; // adjust to your primary color
const SECONDARY_COLOR = colors.secondary; // adjust to your secondary color
const OUTLINE_COLOR = colors.primary; // adjust to your outline color

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isPrimary && { backgroundColor: PRIMARY_COLOR },
        isSecondary && { backgroundColor: SECONDARY_COLOR },
        isOutline && {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: PRIMARY_COLOR,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isPrimary && { color: colors.white },
          isSecondary && { color: colors.text },
          isOutline && { color: OUTLINE_COLOR },
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  disabledText: {
    color: "#999",
  },
});




