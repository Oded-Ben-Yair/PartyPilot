// Determines the type of message and renders the corresponding component.
import React from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import PlanMessage from './PlanMessage';

function ChatMessage({ message }) {
  // Render different components based on the message type
  if (message.type === 'text') {
    return <TextMessage content={message.content} />;
  } else if (message.type === 'image') {
    return <ImageMessage imageUrl={message.content} />;
  } else if (message.type === 'plan') {
    return <PlanMessage planData={message.content} />;
  }
  return null;
}

export default ChatMessage;
