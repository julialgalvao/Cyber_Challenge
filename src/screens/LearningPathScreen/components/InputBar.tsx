import React from 'react';
import { InputContainer, TextField, SendButton, SendText } from '../styles';

type Props = {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
};

export const InputBar: React.FC<Props> = ({ value, onChange, onSend }) => (
    <InputContainer>
        <TextField
            value={value}
            onChangeText={onChange}
            placeholder="Digite sua resposta..."
            keyboardType="numeric"
            accessibilityLabel="Campo de resposta numérica"
            returnKeyType="send"
            onSubmitEditing={onSend}
        />
        <SendButton onPress={onSend} accessibilityRole="button">
            <SendText>Enviar</SendText>
        </SendButton>
    </InputContainer>
);
