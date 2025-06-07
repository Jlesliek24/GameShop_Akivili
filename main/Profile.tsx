// src/main/Profile.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type Props = {
  navigation: any;
};

export default function Profile({ navigation }: Props) {
  const username = 'capayamjago';
  const email    = 'capayamjogacapcap@gmail.com';
  const password = '•••••••';

  const onLogout = () => {
    // clear token in AsyncStorage here if you use one...
    // then pop back to the Auth flow
    navigation.getParent()?.replace('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Akivili.</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutTxt}>Logout →</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar & Greeting */}
      <View style={styles.profile}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../assets/user-icon.png')}
              style={styles.avatarIcon}
            />
          </View>
        </View>
        <Text style={styles.greeting}>
          Hello, <Text style={styles.username}>{username}!</Text>
        </Text>
        <Text style={styles.subtitle}>
          Ingat, lebih baik mengelola keuangan dengan bijak daripada menyesal di kemudian hari.
        </Text>
      </View>

      {/* Form Email & Password */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={email} editable={false} />
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeTxt}>Ganti Email</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            editable={false}
          />
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeTxt}>Ganti Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = '#FFA800';
const BORDER  = '#FFCD5C';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo:      { fontSize: 24, fontWeight: 'bold', color: '#000' },
  logoutBtn: { backgroundColor: '#FFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  logoutTxt: { color: PRIMARY, fontWeight: '600' },

  profile:        { alignItems: 'center', marginTop: 24, paddingHorizontal: 20 },
  avatarWrapper:  { marginBottom: 16 },
  avatarCircle:   {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 4, borderColor: '#000',
    alignItems: 'center', justifyContent: 'center'
  },
  avatarIcon: { width: 50, height: 50, tintColor: '#000' },

  greeting:  { fontSize: 20, fontWeight: '600' },
  username:  { color: PRIMARY },
  subtitle:  {
    textAlign: 'center', color: '#555',
    marginTop: 8, paddingHorizontal: 20, fontSize: 14
  },

  form:    { marginTop: 32, paddingHorizontal: 20 },
  label:   { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  inputRow:{ flexDirection: 'row', alignItems: 'center' },
  input:   {
    flex: 1, borderWidth: 1.5, borderColor: BORDER,
    borderRadius: 100, paddingVertical: 10,
    paddingHorizontal: 16, fontSize: 14, marginRight: 12
  },
  changeBtn:{ backgroundColor: PRIMARY, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  changeTxt:{ color: '#000', fontWeight: '600', fontSize: 14 },
});