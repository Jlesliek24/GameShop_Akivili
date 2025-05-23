// src/user/Signup.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';

type Props = { navigation: any };

export default function Signup({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    // TODO: panggil API register
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
        <Text style={styles.helpIcon}>🎧</Text>
      </View>

      <Text style={styles.title}>Register Member</Text>
      <Text style={styles.subtitle}>
        Buat akun baru, dan pastikan untuk mengingatnya.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="USERNAME" placeholderTextColor="#999"
        value={username} onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="EMAIL" placeholderTextColor="#999"
        keyboardType="email-address"
        value={email} onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD" placeholderTextColor="#999"
        secureTextEntry
        value={password} onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonTxt}>DAFTAR</Text>
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

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: {
    height: 60, backgroundColor: PRIMARY,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#FFF', flex: 1 },
  helpIcon: { fontSize: 24, color: '#FFF' },

  title: { fontSize: 24, fontWeight: '700', marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 24 },

  input: {
    height: 50, backgroundColor: '#EEE',
    borderRadius: 12, paddingHorizontal: 16,
    fontSize: 14, marginBottom: 16
  },

  button: {
    backgroundColor: PRIMARY, height: 50,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginBottom: 24
  },
  buttonTxt: { color: '#000', fontWeight: '700', fontSize: 16 },

  switchRow: { flexDirection: 'row', justifyContent: 'center' },
  link: { color: 'red', fontWeight: '600' },
});
