import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Image
} from 'react-native';

const topics: { [key: string]: { title: string; content: string; simplified: string } } = {
  '1': {
    title: 'Renda Fixa',
    content:
      'Renda Fixa são investimentos com rentabilidade previsível, como Tesouro Direto, CDBs e LCIs/LCAs. Geralmente oferecem menor risco e são ideais para preservar seu capital com tranquilidade.',
    simplified:
      'Renda Fixa é como emprestar seu dinheiro ao governo ou ao banco e receber de volta com um pequeno lucro. É seguro e fácil de entender.',
  },
  '2': {
    title: 'Liquidez',
    content:
      'Liquidez indica a facilidade e a velocidade com que você pode resgatar seu dinheiro. Investimentos com alta liquidez permitem saque rápido, mas podem oferecer um rendimento um pouco menor.',
    simplified:
      'Liquidez é o quão rápido você consegue transformar o investimento em dinheiro na sua conta. Quanto mais rápido, maior a liquidez.',
  },
  '3': {
    title: 'Diversificação',
    content:
      'Diversificação é distribuir seu investimento em diferentes ativos para reduzir riscos. Ao não concentrar tudo em um único investimento, você protege seu patrimônio de oscilações bruscas.',
    simplified:
      'Diversificação é não colocar todos os ovos na mesma cesta: você coloca seu dinheiro em vários investimentos para ficar mais seguro.',
  },
  '4': {
    title: 'Fundos Imobiliários',
    content:
      'Fundos Imobiliários (FIIs) permitem investir em imóveis sem comprar um diretamente. Você recebe rendimentos mensais e pode negociar cotas na bolsa, aproveitando ganhos de aluguéis.',
    simplified:
      'FIIs são empresas que compram imóveis e você compra uma parte delas. Você ganha um pedacinho do aluguel sem ter de gerenciar o imóvel.',
  },
  '5': {
    title: 'Ações',
    content:
      'Ações representam frações do capital de empresas. Ao investir, você se torna sócio e pode ter ganhos maiores, mas também assume maior volatilidade e risco.',
    simplified:
      'Ações são pequenas partes de uma empresa. Se a empresa vai bem, você ganha mais, mas corre mais risco.',
  }
};

type Message = { from: 'bot' | 'user'; text: string };

export default function LearningPathScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const intro: Message = {
      from: 'bot',
      text:
        'Olá! Eu sou o XP Bot, seu assistente de aprendizado sobre investimentos da XP Investimentos.\nNa XP, ajudamos milhões de brasileiros a investir com segurança.\nEscolha um tópico para começar:\n1. Renda Fixa\n2. Liquidez\n3. Diversificação\n4. Fundos Imobiliários\n5. Ações',
    };
    setMessages([intro]);
  }, []);

  const sendBotMessage = (text: string) => {
    setMessages(prev => [...prev, { from: 'bot', text }]);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleSend = () => {
    const choice = input.trim();
    if (!choice) return;
    setMessages(prev => [...prev, { from: 'user', text: choice }]);

    if (!selectedTopic) {
      if (topics[choice]) {
        const topic = topics[choice];
        setSelectedTopic(choice);
        sendBotMessage(
          `Você escolheu *${topic.title}*:\n${topic.content}\n\nDigite:\n1. Ainda não entendi\n2. Voltar ao menu principal`
        );
      } else {
        sendBotMessage('Opção inválida. Por favor, digite um número de 1 a 5.');
      }
    } else {
      if (choice === '1') {
        const key = selectedTopic;
        const topic = topics[key];
        sendBotMessage(
          `Aqui vai uma explicação ainda mais simples:\n${topic.simplified}\n\nDigite: 2 para voltar ao menu principal.`
        );
      } else if (choice === '2') {
        setSelectedTopic(null);
        sendBotMessage(
          'Claro! De volta ao menu principal. Escolha um tópico:\n1. Renda Fixa\n2. Liquidez\n3. Diversificação\n4. Fundos Imobiliários\n5. Ações'
        );
      } else {
        sendBotMessage('Opção inválida. Digite 1 para simplificar ou 2 para voltar ao menu.');
      }
    }
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../assets/chat-bot.png')}
        />
        <Text style={styles.headerTitle}>XP Bot</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View
            style={
              item.from === 'bot' ? styles.botMessage : styles.userMessage
            }
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua resposta..."
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1A1A1A' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#000'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFC107'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#fff'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#363636',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
    marginLeft: 10
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#737373',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
    marginRight: 10
  },
  messageText: { 
    fontSize: 16, 
    lineHeight: 22,
    color: '#fff'
   },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    padding: 8
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 40,
    marginRight: 8
  },
  sendButton: {
    backgroundColor: '#D5A300',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  sendText: { 
    color: '#000', 
    fontSize: 16
  }
});
