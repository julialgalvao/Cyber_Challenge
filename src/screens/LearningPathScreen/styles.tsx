import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #1A1A1A;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #000;
    background-color: #000;
`;

export const Avatar = styled.Image`
    width: 40px; height: 40px; border-radius: 20px;
    margin-right: 10px; background-color: #FFC107;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px; font-weight: bold; color: #fff;
`;

export const ListContent = styled.View`
    padding-bottom: 20px;
`;

export type Sender = 'bot' | 'user';

type BubbleProps = {
  $from: Sender;
};

export const Bubble = styled.View<{ $from: Sender }>`
    align-self: ${({ $from }: BubbleProps) => ($from === 'bot' ? 'flex-start' : 'flex-end')};
    background-color: ${({ $from }: BubbleProps) => ($from === 'bot' ? '#363636' : '#737373')};
    padding: 10px;
    border-radius: 8px;
    margin: 4px 10px;
    max-width: 80%;
`;

export const BubbleText = styled.Text`
    font-size: 16px; line-height: 22px; color: #fff;
`;

export const InputContainer = styled.View`
    flex-direction: row; align-items: center;
    border-top-width: 1px; border-color: #000;
    background-color: #000; padding: 8px;
`;

export const TextField = styled.TextInput`
    flex: 1; border-width: 1px; border-radius: 20px;
    background-color: #fff; padding: 0 15px; height: 40px; margin-right: 8px;
`;

export const SendButton = styled.TouchableOpacity`
    background-color: #D5A300; border-radius: 20px; padding: 8px 16px;
`;

export const SendText = styled.Text`
    color: #000; font-size: 16px; font-weight: 600;
`;
