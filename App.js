// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer }               from '@react-navigation/native';
import { createNativeStackNavigator }        from '@react-navigation/native-stack';
import { supabase } from './user/supabaseClient';
import UserMain                              from './user/UserMain';
import MainTabs                              from './main/Main';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    // subscribe to future changes
    const { data: subs } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
    });
    return () => subs.subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <RootStack.Screen name="App" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={UserMain} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
