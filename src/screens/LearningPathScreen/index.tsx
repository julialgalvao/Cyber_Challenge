import React from 'react';
import { Platform, FlatList } from 'react-native';
import { Container, ListContent } from './styles';
import { useLearningPath } from './hooks/useLearningPath';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { Message } from './types/message';

const LearningPathScreen: React.FC = () => {
    const { messages, input, setInput, handleSend, flatListRef } = useLearningPath();

    return (
        <Container
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <Header />

            <FlatList<Message>
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, i) => i.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => <MessageBubble item={item} />}
                ListFooterComponent={<ListContent />}
            />

            <InputBar value={input} onChange={setInput} onSend={handleSend} />
        </Container>
    );
};

export default LearningPathScreen;
