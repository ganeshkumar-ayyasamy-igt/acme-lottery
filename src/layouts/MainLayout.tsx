import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { colors } from "../theme/Colors";

type MainLayoutProps = {
  children: React.ReactNode;
};

// MainLayout component provides a consistent layout structure for the app.
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1 },
});

export default MainLayout;
