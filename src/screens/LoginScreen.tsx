import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: { navigation: LoginProp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const handleLogin = async () => {
  const json = await AsyncStorage.getItem('userCredentials');
    if (!json) {
      setErrorMessage('Nenhum cadastro encontrado. Faça seu registro primeiro.');
    return;
  }
  const { email: storedEmail, password: storedPassword } = JSON.parse(json);
  if (email === storedEmail && password === storedPassword) {
    setErrorMessage('');
    await AsyncStorage.setItem('userToken', 'dummy-token');
    navigation.replace('Home');
  } else {
    setErrorMessage('E-mail ou senha incorretos');
  }
};

return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo-xp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>InvestBot</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage.length > 0 && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '85%',
    height: '70%',
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    backgroundColor: '#FFC107',
    padding: 1,
    borderRadius: 7,
    marginBottom: 12
  },
  logo: {
    width: 40,
    height: 40
  },
  title: {
    fontSize: 28,
    color: '#FFC107',
    marginBottom: 24,
    fontWeight: '600'
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    marginBottom: 16,
    maxWidth: 400
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    maxWidth: 400
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linkText: {
    color: '#FFC107',
    fontSize: 16,
  }
});
