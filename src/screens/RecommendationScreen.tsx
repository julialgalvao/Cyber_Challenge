import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../navigation/HomeTabs';

type Props = StackScreenProps< HomeTabParamList, 'Recomendações'>;

const recommendations = {
  Conservador: [
    { name: 'Fundo DI XP', desc: 'Alta liquidez, baixo risco, atrelado ao CDI.' },
    { name: 'Tesouro Selic', desc: 'Garantia do Tesouro Nacional, ideal para reserva de emergência.' },
  ],
  Moderado: [
    { name: 'Fundo Balanceado XP', desc: '50% RF, 50% RV – equilíbrio entre segurança e retorno.' },
    { name: 'Tesouro IPCA+', desc: 'Proteção contra a inflação com rendimento real.' },
  ],
  Agressivo: [
    { name: 'Fundo Ações XP', desc: 'Alto potencial de retorno, maior volatilidade.' },
    { name: 'Fundos Imobiliários', desc: 'Renda periódica e possível valorização de ativos.' },
  ],
};

export default function RecommendationScreen({ route, navigation }: Props) {
  const profile = route.params?.profile;

  if (!profile) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>
          Você precisa concluir o quiz de perfil antes de acessar as recomendações.
        </Text>
        <TouchableOpacity
          style={styles.blockedButton}
          onPress={() => navigation.navigate('Simulação')}
        >
          <Text style={styles.blockedButtonText}>SIMULAÇÃO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const data = recommendations[profile];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          Perfil: <Text style={styles.profileText}>{profile}</Text>
        </Text>
        {data.map(item => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A'
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center'
  },
  profileText: {
    fontWeight: 'bold',
    color: '#FFC107'
  },
  card: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    maxWidth: 500
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  cardDesc: {
    color: '#ddd',
    fontSize: 14
  },
  blockedContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  blockedText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  blockedButton: {
    backgroundColor: '#FFC107',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 32
  },
  blockedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  }
});


