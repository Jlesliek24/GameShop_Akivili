// src/user/UserMain.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash          from './Splash';
import Login           from './Login';
import Signup          from './Signup';
import ForgotPass      from './ForgotPass';
import ChangePass      from './ChangePass';
import CustomerService from './CustomerService';

const Stack = createNativeStackNavigator();

export default function UserMain() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash"          component={Splash} />
      <Stack.Screen name="Login"           component={Login} />
      <Stack.Screen name="Signup"          component={Signup} />
      <Stack.Screen name="ForgotPass"      component={ForgotPass} />
      <Stack.Screen name="ChangePass"      component={ChangePass} />
      <Stack.Screen 
        name="CustomerService"  
        component={CustomerService} 
      />
    </Stack.Navigator>
  );
}
