import React from "react";
import { Bubble, BubbleText } from "../styles";
import { Message } from "../types/message";

type Props = { item: Message };

export const MessageBubble: React.FC<Props> = ({ item }) => (
  <Bubble $from={item.from}>
    <BubbleText>{item.text}</BubbleText>
  </Bubble>
);
