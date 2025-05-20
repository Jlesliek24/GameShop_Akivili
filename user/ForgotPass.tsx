// src/user/ForgotPass.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';
import { supabase } from './supabaseClient';
import * as AuthSession from 'expo-auth-session';

type Props = { navigation: any };

export default function ForgotPass({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const sendCode = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: AuthSession.makeRedirectUri()
    });
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Email terkirim', 'Periksa emailmu untuk link reset.');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
      </View>

      <Text style={styles.title}>Lupa Password?</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan Email Anda"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={sendCode}>
        <Text style={styles.sendTxt}>Kirim Kode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate('ChangePass')}
      >
        <Text style={styles.nextTxt}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header:    { height: 60, backgroundColor: PRIMARY, justifyContent: 'center', paddingHorizontal: 16 },
  logo:      { fontSize: 24, fontWeight: 'bold', color: '#FFF' },

  title:       { fontSize: 24, fontWeight: '700', marginTop: 24 },
  input:       {
    height: 48, borderWidth: 1.5, borderColor: PRIMARY,
    borderRadius: 100, paddingHorizontal: 16,
    fontSize: 14, backgroundColor: '#FFF'
  },
  sendBtn:     {
    position: 'absolute', right: 20 + 16, top: 136,
    backgroundColor: PRIMARY, paddingVertical: 12,
    paddingHorizontal: 16, borderRadius: 100
  },
  sendTxt:     { fontWeight: '600', color: '#000' },
  nextBtn:     {
    marginTop: 32, backgroundColor: PRIMARY,
    height: 48, borderRadius: 100,
    alignItems: 'center', justifyContent: 'center'
  },
  nextTxt:     { fontWeight: '600', color: '#000', fontSize: 16 },
});
