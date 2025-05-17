// src/user/Login.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';
// import your headphone icon
import { Headphones } from 'lucide-react-native';

type Props = { navigation: any };

const PRIMARY = '#FFA800';

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // after successful auth, jump into your bottom-tabs flow
    navigation.replace('App');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Header with clickable headphone icon */}
      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CustomerService')}
        >
          <Headphones size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Login Member</Text>
      <Text style={styles.subtitle}>
        Masuk menggunakan akun yang sudah terdaftar.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="USERNAME"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.forgot}>Lupa Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonTxt}>LOGIN</Text>
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
