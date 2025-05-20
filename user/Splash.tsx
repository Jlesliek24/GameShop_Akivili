// src/user/Splash.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

type Props = { navigation: any };

export default function Splash({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Login'), 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} />
      <Text style={styles.logo}>Akivili.</Text>
      <Text style={styles.tagline}>
        Tempat Top-up Game yang Aman, Tercepat, dan Terpercaya.
      </Text>
    </View>
  );
}

const PRIMARY = '#FFA800';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: PRIMARY,
    alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  logo:    { fontSize: 48, fontWeight: '900', color: '#FFF', marginBottom: 12 },
  tagline: { fontSize: 16, color: '#FFF', textAlign: 'center' },
});
