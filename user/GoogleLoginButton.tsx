import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabaseClient';

WebBrowser.maybeCompleteAuthSession();

// Log your current redirect URI
console.log("Expo Google Redirect URI:", AuthSession.makeRedirectUri());

export default function GoogleLoginButton({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '320683579483-iu6j4vhlibemkadiunjdi7d9koh2ida0.apps.googleusercontent.com', // Web client ID from Google Cloud
    // No need for androidClientId or iosClientId in Expo Go
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        supabase.auth.signInWithIdToken({ provider: 'google', token: id_token })
          .then(({ error }) => {
            if (!error) navigation.replace('App');
          });
      }
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
