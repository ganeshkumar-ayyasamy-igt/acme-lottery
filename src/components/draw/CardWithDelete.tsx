import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ball from "./Ball";
import { colors } from "../../theme/Colors";
import { spacing } from "../../theme/Spacing";
import { TextConstant } from "../../utils/Text.constant";

type CardItem = {
  draw: number[];
  drawPlayedAt: string;
};

type CardProps = {
  onCardDelete?: (index: number) => void;
  cardItems?: CardItem[];
};

/**
 * DrawCard component displays a card with lottery numbers and a delete button.
 *
 * @param param0 - Props for the DrawCard component.
 * @returns The DrawCard React component.
 */
const DrawCard = ({ cardItems, onCardDelete }: CardProps) => {
  return (
    <>
      {cardItems &&
        cardItems.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.ballRow}>
              {item.draw.map((num, i) => (
                <Ball key={`${index}-draw-card-${i}`} label={String(num)} />
              ))}
            </View>
            <TouchableOpacity
              onPress={() => onCardDelete && onCardDelete(index)}
              activeOpacity={0.7}
              style={styles.deleteButton}
            >
              <Text>{TextConstant.DELETE_ROW}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </>
  );
};

export default DrawCard;

// StyleSheet for DrawCard component
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardGrey,
    borderRadius: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  ballRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.md,
  },
  deleteButton: {
    backgroundColor: colors.deleteGrey,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
});
