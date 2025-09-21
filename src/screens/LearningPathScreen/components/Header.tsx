import React from 'react';
import { HeaderContainer, Avatar, HeaderTitle } from '../styles';

const avatarSource = require('../../../assets/chat-bot.png');

export const Header: React.FC = () => (
    <HeaderContainer accessibilityRole="header">
        <Avatar source={avatarSource} />
        <HeaderTitle>XP Bot</HeaderTitle>
    </HeaderContainer>
);
