// src/user/ForgotPass.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';

type Props = { navigation: any };

export default function ForgotPass({ navigation }: Props) {
  const [email, setEmail]     = useState('');
  const [code, setCode]       = useState('');

  const sendCode = () => {
    // TODO: kirim kode verifikasi ke email
  };

  const onNext = () => {
    navigation.navigate('ChangePass');
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
        value={email} onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={sendCode}>
        <Text style={styles.sendTxt}>Kirim Kode</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { marginTop: 16 }]}
        placeholder="Masukkan Kode Verifikasi"
        placeholderTextColor="#999"
        value={code} onChangeText={setCode}
      />

      <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
        <Text style={styles.nextTxt}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: {
    height: 60, backgroundColor: PRIMARY,
    justifyContent: 'center', paddingHorizontal: 16
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },

  title: { fontSize: 24, fontWeight: '700', marginTop: 24 },

  input: {
    height: 48, borderWidth: 1.5, borderColor: PRIMARY,
    borderRadius: 100, paddingHorizontal: 16,
    fontSize: 14, backgroundColor: '#FFF'
  },

  sendBtn: {
    position: 'absolute', right: 20 + 16, // align dengan padding container
    top: 136, // kira-kira di samping input email
    backgroundColor: PRIMARY,
    paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 100
  },
  sendTxt: { fontWeight: '600', color: '#000' },

  nextBtn: {
    marginTop: 32, backgroundColor: PRIMARY,
    height: 48, borderRadius: 100,
    alignItems: 'center', justifyContent: 'center'
  },
  nextTxt: { fontWeight: '600', color: '#000', fontSize: 16 },
});
