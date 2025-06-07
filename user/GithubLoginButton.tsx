import React, { useState } from 'react';
import { Button, ActivityIndicator, Alert } from 'react-native';
import { supabase } from './supabaseClient';

export default function GithubLoginButton({ navigation }) {
  const [loading, setLoading] = useState(false);

  const signInWithGithub = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
      }
    });
    setLoading(false);

    if (error) {
      Alert.alert('GitHub Login Failed', error.message);
    }
  };

  return (
    <Button
      title={loading ? 'Loading...' : 'Login with GitHub'}
      onPress={signInWithGithub}
      disabled={loading}
    />
  );
}
