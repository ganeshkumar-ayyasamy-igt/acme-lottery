// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PickDrawScreen from '../screens/PickDrawScreen';
import { navigationTheme } from '../theme';
import { TextConstant } from '../utils/Text.constant';

export type RootStackParamList = {
  Home: undefined;
  PickDraw: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: { backgroundColor: navigationTheme.colors.card },
          headerTintColor: navigationTheme.colors.text,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{
              title: TextConstant.HOME_TITLE,
            }}
        />
        <Stack.Screen
            name="PickDraw"
            component={PickDrawScreen}
            options={{
                title: TextConstant.LUCKY_LOTTO,
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
