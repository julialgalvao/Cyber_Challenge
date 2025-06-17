import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Question = {
  text: string;
  options: { label: string; value: number }[];
};

const questions: Question[] = [
  {
    text: '1) Qual é o seu objetivo principal?',
    options: [
      { label: 'Preservar capital (baixo risco)', value: 1 },
      { label: 'Equilíbrio risco/retorno', value: 2 },
      { label: 'Maximizar retorno (alto risco)', value: 3 },
    ],
  },
  {
    text: '2) Qual seu horizonte de investimento?',
    options: [
      { label: 'Curto prazo (até 1 ano)', value: 1 },
      { label: 'Médio prazo (1–5 anos)', value: 2 },
      { label: 'Longo prazo (>5 anos)', value: 3 },
    ],
  },
  {
    text: '3) Como reagiria a uma queda de 10% no valor do seu investimento?',
    options: [
      { label: 'Venderia imediatamente', value: 1 },
      { label: 'Manteria e avaliaria', value: 2 },
      { label: 'Aproveitaria para comprar mais', value: 3 },
    ],
  },
  {
    text: '4) Qual parcela do seu patrimônio destina a este investimento?',
    options: [
      { label: 'Menos de 10%', value: 1 },
      { label: '10%–30%', value: 2 },
      { label: 'Mais de 30%', value: 3 },
    ],
  },
  {
    text: '5) Qual retorno médio anual você espera?',
    options: [
      { label: 'Até 6%', value: 1 },
      { label: '6%–12%', value: 2 },
      { label: 'Acima de 12%', value: 3 },
    ],
  }
];

export default function SimulationScreen({ navigation }: any) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (value: number) => {
    const nextScore = score + value;
    if (idx + 1 < questions.length) {
      setScore(nextScore);
      setIdx(idx + 1);
    } else {
      let profile: 'Conservador' | 'Moderado' | 'Agressivo';
      if (nextScore <= 7) profile = 'Conservador';
      else if (nextScore <= 11) profile = 'Moderado';
      else profile = 'Agressivo';

      navigation.navigate('Recomendações', { profile });
    }
  };

  const q = questions[idx];

    return (
    <View style={styles.screen}>
        <Text style={styles.question}>{q.text}</Text>
        {q.options.map((opt) => (
          <TouchableOpacity
            key={opt.label}
            style={styles.optionButton}
            onPress={() => handleAnswer(opt.value)}
          >
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.progress}>Pergunta {idx + 1} de {questions.length}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  question: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    maxWidth: 500
  },
  optionText: {
    color: '#fff',
    fontSize: 16
  },
  progress: {
    marginTop: 16,
    color: '#FFC107',
    fontSize: 14
  }
});
