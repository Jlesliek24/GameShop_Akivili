// App.js
import React from 'react';
import { NavigationContainer }     from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs   from './main/Main';      // Tab navigator utama
import UserMain   from './user/UserMain';  // Flow auth (splash, login, dll.)

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Langsung ke MainTabs sebagai initial screen */}
        <RootStack.Screen name="App" component={MainTabs} />
        {/* Auth flow tetap terdaftar, tapi tidak dipakai awalnya */}
        <RootStack.Screen name="Auth" component={UserMain} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}