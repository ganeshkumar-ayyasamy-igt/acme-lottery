// navigation/AppNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import PickDrawScreen from "../screens/PickDrawScreen";
import { navigationTheme } from "../theme";
import { TextConstant } from "../utils/Text.constant";

export type RootStackParamList = {
  Home: undefined;
  PickDraw: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="YourNumbers"
        screenOptions={{
          headerStyle: { backgroundColor: navigationTheme.colors.card },
          headerTintColor: navigationTheme.colors.text,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="YourNumbers"
          component={HomeScreen}
          options={{
            title: "Your Numbers",
          }}
        />
        <Stack.Screen
          name="PickDraw"
          component={PickDrawScreen}
          options={{
            title: "Lucky Lotto",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
