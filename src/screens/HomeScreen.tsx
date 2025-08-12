// screens/HomeScreen.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/button/Button";
import DrawCard from "../components/draw/CardWithDelete";
import MainLayout from "../layouts/MainLayout";
import { RootStackParamList } from "../navigation/AppNavigator";
import { RootState } from "../store";
import {
  purchaseTicket,
  removeDrawByIndex,
} from "../store/slices/UserLuckyDrawSlice";
import { colors } from "../theme/Colors";
import { spacing } from "../theme/Spacing";
import { DrawConstant } from "../utils/Draw.constant";
import { TextConstant } from "../utils/Text.constant";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

/**
 * HomeScreen component for displaying and managing user's lottery tickets.
 *
 * @remarks
 * - Shows a list of tickets and allows users to add, delete, and purchase tickets.
 * - Handles navigation to the ticket selection screen.
 * - Displays purchase confirmation and handles ticket purchase logic.
 * - Disables actions based on ticket count and application constants.
 *
 * @param navigation - React Navigation prop for screen navigation.
 * @returns The rendered HomeScreen component.
 */
export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const tickets = useSelector(
    (state: RootState) => state.userLuckyDraw.tickets,
  );
  const dispatch = useDispatch();

  // Memoize disabled state based on tickets length
  const isDisabled = useMemo(() => tickets.length === 0, [tickets]);
  const isAddDisabled = useMemo(
    () => tickets.length >= DrawConstant.DRAW_LOT_TICKET_MAX,
    [tickets],
  );

  // Handle deletion of a ticket by index
  const handleDelete = (index: number) => {
    dispatch(removeDrawByIndex(index));
  };

  // Navigation redirection to lottery screen
  const onAddPlay = () => {
    navigation.navigate("PickDraw");
  };

  // Purchase ticket handler
  const onPurchase = () => {
    if (tickets.length === 0) {
      Alert.alert(TextConstant.PURCHASE_EMPTY);
      return;
    }
    // Prepare message for purchase confirmation
    const message = tickets.map((ticket) => ticket.draw.join(",")).join("\n");
    Alert.alert(TextConstant.PURCHASE_MSG, message, [
      {
        text: TextConstant.OK,
        onPress: () => {
          dispatch(purchaseTicket());
        },
      },
    ]);
  };

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <DrawCard cardItems={tickets} onCardDelete={handleDelete} />
        {!isAddDisabled && (
          <Button
            title={TextConstant.ADD_PLAY}
            variant="outline"
            onPress={onAddPlay}
          />
        )}
      </ScrollView>
      <View style={[styles.buttonPurchaseContainer, { bottom: insets.bottom }]}>
        {!isDisabled && (
          <Button title={TextConstant.PURCHASE} onPress={onPurchase} />
        )}
        {isDisabled && (
          <Button
            title={TextConstant.PURCHASE}
            variant="secondary"
            disabled
            onPress={onPurchase}
          />
        )}
      </View>
    </MainLayout>
  );
}

// StyleSheet for HomeScreen
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.md, marginBottom: 150 },
  buttonPurchaseContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
