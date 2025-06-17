import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function ProfileScreen({ navigation }: { navigation: ProfileProp }) {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const json = await AsyncStorage.getItem('userProfile');
      if (json) setProfile(JSON.parse(json));
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userProfile');
    navigation.replace('Login');
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/perfil.png')}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      {profile && (
        <>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 50
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center'
  },
  email: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 32,
    textAlign: 'center'
  },
  logoutButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 6
  },
  logoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
