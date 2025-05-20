// src/user/Login.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';
import * as AuthSession                 from 'expo-auth-session';
import { supabase }                     from './supabaseClient';
import { Headphones }                   from 'lucide-react-native';

type Props = { navigation: any };

export default function Login({ navigation }: Props) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    });
    if (error) return Alert.alert('Login failed', error.message);
    // session change drives App.js to switch to MainTabs
  };

  const onGoogleLogin = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:  { redirectTo: redirectUri },
      });
      if (error) throw error;
    } catch (err: any) {
      Alert.alert('Google login failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerService')}>
          <Headphones size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Login Member</Text>
      <Text style={styles.subtitle}>
        Masuk menggunakan akun yang sudah terdaftar.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="#999"
        secureTextEntry
        value={password} onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.forgot}>Lupa Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonTxt}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn} onPress={onGoogleLogin}>
        <Text style={styles.googleTxt}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Daftar di sini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: {
    height: 60, backgroundColor: PRIMARY,
    flexDirection: 'row', alignItems: 'center', padding: 16
  },
  logo:     { flex:1, fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  title:    { fontSize: 24, fontWeight: '700', marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 24 },

  input:    {
    height: 50, backgroundColor: '#EEE',
    borderRadius: 12, paddingHorizontal: 16,
    fontSize: 14, marginBottom: 16
  },
  forgot:   { textAlign: 'right', color: PRIMARY, marginBottom: 24 },

  button:   {
    backgroundColor: PRIMARY, height: 50,
    borderRadius: 12, alignItems: 'center',
    justifyContent: 'center', marginBottom: 16
  },
  buttonTxt:{ color: '#000', fontWeight: '700', fontSize: 16 },

  googleBtn:{ backgroundColor: '#DB4437', height: 50,
    borderRadius: 12, alignItems: 'center',
    justifyContent: 'center', marginBottom: 24
  },
  googleTxt:{ color: '#FFF', fontWeight: '700', fontSize: 16 },

  switchRow:{ flexDirection: 'row', justifyContent: 'center' },
  link:     { color: 'red', fontWeight: '600' },
});
