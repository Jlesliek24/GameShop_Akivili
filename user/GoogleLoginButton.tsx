import React, { useEffect } from 'react';
import { Button, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabaseClient';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '320683579483-iu6j4vhlibemkadiunjdi7d9koh2ida0.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        supabase.auth.signInWithIdToken({ provider: 'google', token: id_token })
          .then(({ error, data }) => {
            if (error) {
              Alert.alert('Google Login Failed', error.message);
            } else {
              Alert.alert('Login Berhasil', JSON.stringify(data));
              // navigation.replace('Splash'); // Let Splash handle route
            }
          });
      }
    }
    if (response?.type === 'error') {
      Alert.alert('Google Auth Error', JSON.stringify(response));
    }
  }, [response]);

  return (
    <Button
      title="Login with Google"
      onPress={() => promptAsync()}
      disabled={!request}
    />
  );
}
