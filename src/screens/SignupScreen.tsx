import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SignupProp = StackNavigationProp<RootStackParamList, 'Signup'>;
export default function SignupScreen({ navigation }: { navigation: SignupProp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setErrorMessage('Preencha todos os campos');
      return;
    }
    const credentials = { email, password };
    const profile = { name, email };
    await AsyncStorage.setItem('userCredentials', JSON.stringify(credentials));
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    setErrorMessage('');
    navigation.replace('Login');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
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

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.linkText}>Já tenho conta</Text>
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
    fontSize: 16
  }
});
