import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MainLayout from '../layouts/MainLayout';
import { spacing } from '../theme/Spacing';
import { colors } from '../theme/Colors';
import { TextConstant } from '../utils/Text.constant';
import Button from '../components/button/Button';
import Ball from '../components/draw/Ball';
import { moderateScale } from 'react-native-size-matters';
import { DrawConstant } from '../utils/Draw.constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addTickets } from '../store/slices/UserLuckyDrawSlice';
import { RootState } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'PickDraw'>;

const TOTAL_NUMBERS = DrawConstant.DRAW_LOT_END_NUM;
const NUM_PER_ROW = DrawConstant.DRAW_LOT_NUM_PER_ROW;
const numbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

// Split array into N columns, where each column has M items (here M=6)
const splitIntoColumns = (arr: number[], numCols: number): number[][] => {
  // Initialize empty arrays for each column
  const cols: number[][] = Array.from({ length: numCols }, () => []);
  // Distribute items by modulo
  arr.forEach((item, index) => {
    const colIndex = index % numCols;
    cols[colIndex].push(item);
  });
  return cols;
}
const columns = splitIntoColumns(numbers, NUM_PER_ROW);

const PickDrawScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const tickets = useSelector((state: RootState) => state.userLuckyDraw.tickets);
  const dispatch = useDispatch();

  const [selectedLot, setSelectedLot] =  useState<number[]>([]);
  const drawLotBase: string[] = Array.from({ length: DrawConstant.DRAW_LOT_TICKET_BASE }, () => "");

  // Memoize disabled state based on tickets length
  const isDisabled = useMemo(() => selectedLot.length < DrawConstant.DRAW_LOT_TICKET_BASE, [selectedLot]);

  const onPressCallback = (num: number) => {
    if (selectedLot.length === DrawConstant.DRAW_LOT_TICKET_BASE && !selectedLot.includes(num)) {
      return false;
    }
    setSelectedLot((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }
      return [...prev, num];
    });
  };

  const isSameDraw = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    return a.every((num, i) => num === b[i]);
  };

  const onPlayNumbers = () => {
    if (selectedLot.length < DrawConstant.DRAW_LOT_TICKET_BASE) {
      Alert.alert(TextConstant.SELECTION_MISSED);
      return false;
    }

    const duplicate = tickets.some(ticket => isSameDraw(ticket.draw, selectedLot));
    if (duplicate) {
      // Handle duplicate ticket case
      Alert.alert(TextConstant.SELECTION_DUPLICATE);
      return false;
    }
    dispatch(addTickets(selectedLot));
    navigation.goBack();
  };

  const NumberGridList = () => {
    return (
      <View style={[styles.lotContainer]}>
        {columns.map((col, colIndex) => (
          <View key={`col-${colIndex}`} style={[styles.circle]}>
            {col.map((num) => (
              <View style={[styles.circle]} key={`col-${colIndex}` + `-num-${num}`}>
                <Ball label={num.toString()} sizePercent={10} isTouchable onPress={() => onPressCallback(num)} isSelected={selectedLot.includes(num)}/>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <View style={styles.drawContainer}>
          {drawLotBase.map((_, index) => (
            <Ball key={index} label={selectedLot[index] || ""} sizePercent={12} />
          ))}
        </View>
        <View style={styles.drawLotContainer}>
          <Text style={styles.title}>{TextConstant.PICK_LOT_MIN}</Text>
          {NumberGridList()}
        </View>
      </ScrollView>
      <View style={[styles.buttonPurchaseContainer, { bottom: insets.bottom }]}>
        <Button title={TextConstant.PLAY_NUMBERS} variant={isDisabled ? "secondary" : "primary" } disabled={isDisabled} onPress={onPlayNumbers}/>
      </View>
    </MainLayout>
  );
}

export default PickDrawScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 100, },
  title: { fontWeight: 'bold', fontSize: moderateScale(16), paddingHorizontal: spacing.sm },
  buttonPurchaseContainer: { backgroundColor: colors.white, position: 'absolute', left: 0, right: 0, paddingHorizontal: spacing.md, paddingBottom: spacing.md, },
  lotContainer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: spacing.sm },
  drawLotContainer: { padding: spacing.md, },
  circle: { paddingVertical: spacing.sm, paddingHorizontal: 2 },
  drawContainer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: spacing.md, backgroundColor: colors.primary },
});
