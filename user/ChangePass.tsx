// src/user/ChangePass.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';
import { supabase } from './supabaseClient';

type Props = { navigation: any };

export default function ChangePass({ navigation }: Props) {
  const [newPass, setNewPass] = useState('');

  const onChange = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Berhasil', 'Password berhasil diganti.');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
      </View>

      <Text style={styles.title}>Ganti Password</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Baru"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPass} onChangeText={setNewPass}
        />
        <TouchableOpacity style={styles.changeBtn} onPress={onChange}>
          <Text style={styles.changeTxt}>Ganti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header:    { height: 60, backgroundColor: PRIMARY, justifyContent: 'center', paddingHorizontal: 16 },
  logo:      { fontSize: 24, fontWeight: 'bold', color: '#FFF' },

  title: { fontSize: 24, fontWeight: '700', marginTop: 24 },
  row:   { flexDirection: 'row', alignItems: 'center', marginTop: 24 },

  input: {
    flex: 1, height: 48,
    borderWidth: 1.5, borderColor: PRIMARY,
    borderRadius: 100, paddingHorizontal: 16,
    fontSize: 14, backgroundColor: '#FFF',
    marginRight: 12
  },
  changeBtn:{ backgroundColor: PRIMARY, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 100 },
  changeTxt:{ fontWeight: '600', color: '#000' },
});
