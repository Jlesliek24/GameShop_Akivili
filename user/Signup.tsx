import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = { navigation: any };

const PRIMARY = '#FFA800';

export default function Signup({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setLoading(true);
    // Mendapatkan redirect URI (default, sesuai Expo)
    const redirectUri = AuthSession.makeRedirectUri();

    // 1. Daftarkan user ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUri },
    });

    setLoading(false);

    if (error) {
      Alert.alert('Register failed', error.message);
      return;
    }

    // 2. Simpan username sementara di AsyncStorage
    try {
      await AsyncStorage.setItem('pending-username', username);
    } catch (e) {
      // Bisa ditambahkan log error, jika ingin
    }

    Alert.alert(
      'Cek Emailmu',
      'Kami telah mengirim link verifikasi, silakan klik untuk konfirmasi sebelum login.'
    );
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
      </View>

      <Text style={styles.title}>Register Member</Text>
      <Text style={styles.subtitle}>
        Buat akun baru, dan pastikan untuk mengingatnya.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="USERNAME"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onRegister} disabled={loading}>
        <Text style={styles.buttonTxt}>{loading ? 'Loading...' : 'DAFTAR'}</Text>
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text>Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login di sini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header:    { height: 60, backgroundColor: PRIMARY, justifyContent: 'center', paddingHorizontal: 16 },
  logo:      { fontSize: 24, fontWeight: 'bold', color: '#FFF' },

  title:    { fontSize: 24, fontWeight: '700', marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 24 },

  input:    {
    height: 50, backgroundColor: '#EEE',
    borderRadius: 12, paddingHorizontal: 16,
    fontSize: 14, marginBottom: 16
  },
  button:   {
    backgroundColor: PRIMARY, height: 50,
    borderRadius: 12, alignItems: 'center',
    justifyContent: 'center', marginBottom: 24
  },  
  buttonTxt:{ color: '#000', fontWeight: '700', fontSize: 16 },
  switchRow:{ flexDirection: 'row', justifyContent: 'center' },
  link:     { color: 'red', fontWeight: '600' },
});
