import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator,
} from 'react-native';
import { Headphones } from 'lucide-react-native';
import { supabase } from './supabaseClient'; // <--- import supabase
import GoogleLoginButton from './GoogleLoginButton';
import GithubLoginButton from './GithubLoginButton';

const PRIMARY = '#FFA800';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Optionally, listen for auth state changes here or in Splash/root

  const onLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigation.replace('App'); // If login is successful
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
      <Text style={styles.subtitle}>Masuk menggunakan akun yang sudah terdaftar.</Text>

      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
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

      {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 12 }}>{error}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.forgot}>Lupa Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonTxt}>LOGIN</Text>}
      </TouchableOpacity>

      {/* Social logins */}
      <GoogleLoginButton navigation={navigation} />
      <GithubLoginButton navigation={navigation} />

      <View style={styles.switchRow}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Daftar di sini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: {
    height: 60,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  logo:     { fontSize: 24, fontWeight: 'bold', color: '#FFF', flex: 1 },
  title:    { fontSize: 24, fontWeight: '700', marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 24 },

  input: {
    height: 50,
    backgroundColor: '#EEE',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 16
  },
  forgot:   { textAlign: 'right', color: PRIMARY, marginBottom: 24 },

  button:   {
    backgroundColor: PRIMARY,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  buttonTxt:{ color: '#000', fontWeight: '700', fontSize: 16 },

  switchRow:{ flexDirection: 'row', justifyContent: 'center' },
  link:     { color: 'red', fontWeight: '600' },
});