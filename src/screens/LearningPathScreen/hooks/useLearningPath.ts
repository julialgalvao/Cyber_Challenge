import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Message } from '../types/message';
import { topics, mainMenuText } from '../models/topics';

export const useLearningPath = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const flatListRef = useRef<FlatList<Message>>(null);

    useEffect(() => {
        setMessages([{
            from: 'bot',
            text:
                'Olá! Eu sou o XP Bot, seu assistente de aprendizado sobre investimentos da XP Investimentos.\n' +
                'Na XP, ajudamos milhões de brasileiros a investir com segurança.\n' +
                mainMenuText,
        }]);
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
        return () => clearTimeout(id);
    }, [messages]);

    const pushBot = (text: string) => setMessages(prev => [...prev, { from: 'bot', text }]);
    const pushUser = (text: string) => setMessages(prev => [...prev, { from: 'user', text }]);

    const handleSend = () => {
        const choice = input.trim();
        if (!choice) return;

        pushUser(choice);

        if (!selectedTopic) {
            if (topics[choice]) {
                const topic = topics[choice];
                setSelectedTopic(choice);
                pushBot(
                    `Você escolheu *${topic.title}*:\n${topic.content}\n\nDigite:\n1. Ainda não entendi\n2. Voltar ao menu principal`
                );
            } else {
                pushBot('Opção inválida. Por favor, digite um número de 1 a 5.');
            }
        } else {
            if (choice === '1') {
                const t = topics[selectedTopic];
                pushBot(
                    `Aqui vai uma explicação ainda mais simples:\n${t.simplified}\n\nDigite: 2 para voltar ao menu principal.`
                );
            } else if (choice === '2') {
                setSelectedTopic(null);
                pushBot(`Claro! De volta ao menu principal.\n${mainMenuText}`);
            } else {
                pushBot('Opção inválida. Digite 1 para simplificar ou 2 para voltar ao menu.');
            }
        }
        setInput('');
    };

    return {
        messages,
        input,
        setInput,
        handleSend,
        flatListRef,
    };
};
